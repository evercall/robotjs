var robot = require('..');

//Increase delay to help it reliability.
robot.setMouseDelay(100);

describe('Mouse', () => {
  it('Get the initial mouse position.', function()
  {
    const lastKnownPos = robot.getMousePos();
    expect(lastKnownPos.x).toBeDefined();
    expect(lastKnownPos.y).toBeDefined();
  });

  it('Move the mouse.', function()
  {
    expect(robot.moveMouse(100, 100)).toBe(1);
    const currentPos = robot.getMousePos();
    expect(currentPos.x).toEqual(100);
    expect(currentPos.y).toEqual(100);

    expect(function()
    {
      robot.moveMouse(0, 1, 2, 3);
    }).toThrowError(/Invalid number/);

    expect(function()
    {
      robot.moveMouse(0);
    }).toThrowError(/Invalid number/);

    expect(robot.moveMouse(0, 0)).toBe(1);
  });

  it('Move the mouse smoothly.', function()
  {
    robot.moveMouseSmooth(0, 0);
    expect(robot.moveMouseSmooth(100, 100)).toBe(1);
    const currentPos = robot.getMousePos();
    expect(currentPos.x).toEqual(100);
    expect(currentPos.y).toEqual(100);

    expect(function()
    {
      robot.moveMouseSmooth(0, 1, 2, 3);
    }).toThrowError(/Invalid number/);

    expect(function()
    {
      robot.moveMouseSmooth(0);
    }).toThrowError(/Invalid number/);

    expect(robot.moveMouseSmooth(0, 0)).toBe(1);

  });

  it('Click the mouse.', function()
  {
    expect(robot.mouseClick()).toBeTruthy();
    expect(robot.mouseClick("left")).toBe(1);
    expect(robot.mouseClick("middle")).toBe(1);
    expect(robot.mouseClick("right")).toBe(1);

    expect(robot.mouseClick("left", true)).toBeTruthy();

    expect(function()
    {
      robot.mouseClick("party");
    }).toThrowError(/Invalid mouse/);

    expect(function()
    {
      robot.mouseClick("0");
    }).toThrowError(/Invalid mouse/);

    expect(function()
    {
      robot.mouseClick("left", 0, "it");
    }).toThrowError(/Invalid number/);

  });

  it('Drag the mouse.', function()
  {

    expect(robot.dragMouse(5, 5)).toBe(1);

    expect(function()
    {
      robot.dragMouse(0);
    }).toThrowError(/Invalid number/);

    expect(function()
    {
      robot.dragMouse(1, 1, "left", 5);
    }).toThrowError(/Invalid number/);

    expect(function()
    {
      robot.dragMouse(2, 2, "party");
    }).toThrowError(/Invalid mouse/);

  });

  it('Mouse scroll.', function()
  {
    expect(robot.mouseClick()).toBe(1);
    expect(robot.scrollMouse(0, 1 * 120)).toBe(1);
    expect(robot.scrollMouse(0, 20 * 120)).toBe(1);
    expect(robot.scrollMouse(0, -5 * 120)).toBe(1);
    expect(robot.scrollMouse(1 * 120, 0)).toBe(1);
    expect(robot.scrollMouse(20 * 120, 0)).toBe(1);
    expect(robot.scrollMouse(-5 * 120, 0)).toBe(1);
    expect(robot.scrollMouse(-5 * 120, -5 * 120)).toBe(1);
  });

  it('Mouse Toggle', function()
  {
    expect(robot.mouseToggle('up', 'right')).toBe(1);
  });
});
