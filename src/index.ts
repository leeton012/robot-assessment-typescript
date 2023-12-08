class Robot {
    //x and y to store the current coordinates and direction to store the compass heading (N, S, E, or W).
    x: number;
    y: number;
    direction: string;

    // initializes the robot with the initial position and direction.
    constructor(x: number, y: number, direction: string) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    //determine the current direction of the robot and updates its coordinates accordingly
    move(steps: number): void {
        switch (this.direction) {
            case 'N':
                this.y = (this.y + steps) % 100;
                break;
            case 'S':
                this.y = (this.y - steps + 100) % 100;
                break;
            case 'E':
                this.x = (this.x + steps) % 100;
                break;
            case 'W':
                this.x = (this.x - steps + 100) % 100;
                break;
        }
    }

    //determine the current index of the robot's direction and then updates the direction for left
    rotateLeft(steps: number): void {
        const directions = ['N', 'W', 'S', 'E'];
        const currentIndex = directions.indexOf(this.direction);
        this.direction = directions[(currentIndex + steps) % 4];
    }

    //determine the current index of the robot's direction and then updates the direction for right
    rotateRight(steps: number): void {
        const directions = ['N', 'E', 'S', 'W'];
        const currentIndex = directions.indexOf(this.direction);
        this.direction = directions[(currentIndex + steps) % 4];
    }

    //calling the existing function and update the direction based on current index in array of direction
    executeCommand(command: string, steps: number): void {
        switch (command) {
            case 'M':
                this.move(steps);
                break;
            case 'L':
                this.rotateLeft(steps);
                break;
            case 'R':
                this.rotateRight(steps);
                break;
        }
    }
}

//takes command ('M', 'L', or 'R') and the number of steps and calls the appropriate method
function processCommands(input: string): void {
    const lines = input.split('\n');

    const initialPosition = lines[0].split(' ');

    const initialX = parseInt(initialPosition[1]);

    const initialY = parseInt(initialPosition[2]);

    const initialDirection = initialPosition[0];

    const robot = new Robot(initialX, initialY, initialDirection);

    const commands = lines[1].match(/[A-Z]\d*/g) || [];
    for (const command of commands) {
        const action = command[0];
        const steps = parseInt(command.slice(1)) || 1;
        robot.executeCommand(action, steps);
    }

    console.log(`${robot.direction} ${robot.x} ${robot.y}`);
}


const input = "N 0 0\nM1RM4L3";
processCommands(input); //S 4 1



