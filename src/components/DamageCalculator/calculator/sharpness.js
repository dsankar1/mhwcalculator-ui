export const Sharpness = {
    PURPLE: 'purple',
    WHITE: 'white',
    BLUE: 'blue',
    GREEN: 'green',
    YELLOW: 'yellow',
    ORANGE: 'orange',
    RED: 'red'
};

export const attackMultMap = {
    [Sharpness.PURPLE]: 1.39,
    [Sharpness.WHITE]: 1.32,
    [Sharpness.BLUE]: 1.2,
    [Sharpness.GREEN]: 1.05,
    [Sharpness.YELLOW]: 1,
    [Sharpness.ORANGE]: 0.75,
    [Sharpness.RED]: 0.5
};

export const elementMultMap = {
    [Sharpness.PURPLE]: 1.3,
    [Sharpness.WHITE]: 1.125,
    [Sharpness.BLUE]: 1.0625,
    [Sharpness.GREEN]: 1,
    [Sharpness.YELLOW]: 0.75,
    [Sharpness.ORANGE]: 0.5,
    [Sharpness.RED]: 0.25
};

export default Sharpness;
