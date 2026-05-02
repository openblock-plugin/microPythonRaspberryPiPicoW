const { formatMessage, ArgumentType, BlockType, ProgramModeType, CommonPeripheral } = window.Scratch;

const PNPID_LIST = [
    // Micropython Raspberry Pi Pico
    'USB\\VID_2E8A&PID_0005'
];

const SERIAL_CONFIG = {
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
    dtr: true,
    rts: false
};

const DIVECE_OPT = {
    type: 'microPython',
    chip: 'raspberryPiPico',
    firmware: 'microPython-standard-raspberryPiPicoW.uf2'
};

const Pins = {
    GP0: '0', GP1: '1', GP2: '2', GP3: '3', GP4: '4', GP5: '5', GP6: '6', GP7: '7',
    GP8: '8', GP9: '9', GP10: '10', GP11: '11', GP12: '12', GP13: '13', GP14: '14',
    GP15: '15', GP16: '16', GP17: '17', GP18: '18', GP19: '19', GP20: '20', GP21: '21',
    GP22: '22', GP23: '23', GP24: '24', GP25: '25', GP26: '26', GP27: '27', GP28: '28'
};

const Level = {
    High: '1',
    Low: '0'
};

const SerialNo = {
    Serial0: '0',
    Serial1: '1'
};

const Buadrate = {
    B4800: '4800',
    B9600: '9600',
    B19200: '19200',
    B38400: '38400',
    B57600: '57600',
    B76800: '76800',
    B115200: '115200'
};

const Eol = {
    Warp: 'warp',
    NoWarp: 'noWarp'
};

const Mode = {
    Input: 'IN',
    Output: 'OUT',
    InputPullup: 'PULL_UP',
    InputPulldown: 'PULL_DOWN'
};

const InterrupMode = {
    Rising: 'RISING',
    Falling: 'FALLING',
    Change: 'CHANGE'
};

class MicroPythonRaspberryPiPicoW extends CommonPeripheral {
    constructor (runtime, deviceId) {
        super(runtime, deviceId, PNPID_LIST, SERIAL_CONFIG, DIVECE_OPT);
    }
}

class OpenBlockMicroPythonRaspberryPiPicoWDevice {
    get DEVICE_ID () {
        return 'microPythonRaspberryPiPicoW';
    }

    get PINS_MENU () {
        return [
            { text: 'GP0', value: Pins.GP0 },
            { text: 'GP1', value: Pins.GP1 },
            { text: 'GP2', value: Pins.GP2 },
            { text: 'GP3', value: Pins.GP3 },
            { text: 'GP4', value: Pins.GP4 },
            { text: 'GP5', value: Pins.GP5 },
            { text: 'GP6', value: Pins.GP6 },
            { text: 'GP7', value: Pins.GP7 },
            { text: 'GP8', value: Pins.GP8 },
            { text: 'GP9', value: Pins.GP9 },
            { text: 'GP10', value: Pins.GP10 },
            { text: 'GP11', value: Pins.GP11 },
            { text: 'GP12', value: Pins.GP12 },
            { text: 'GP13', value: Pins.GP13 },
            { text: 'GP14', value: Pins.GP14 },
            { text: 'GP15', value: Pins.GP15 },
            { text: 'GP16', value: Pins.GP16 },
            { text: 'GP17', value: Pins.GP17 },
            { text: 'GP18', value: Pins.GP18 },
            { text: 'GP19', value: Pins.GP19 },
            { text: 'GP20', value: Pins.GP20 },
            { text: 'GP21', value: Pins.GP21 },
            { text: 'GP22', value: Pins.GP22 },
            { text: 'LED', value: Pins.GP25 },
            { text: 'GP26', value: Pins.GP26 },
            { text: 'GP27', value: Pins.GP27 },
            { text: 'GP28', value: Pins.GP28 }
        ];
    }

    get DEFAULT_PIN () {
        return Pins.GP0;
    }

    get UART_TX_PIN () {
        return [
            { text: 'GP0 (UART0)', value: Pins.GP0 },
            { text: 'GP12 (UART0)', value: Pins.GP12 },
            { text: 'GP16 (UART0)', value: Pins.GP16 },
            { text: 'GP4 (UART1)', value: Pins.GP4 },
            { text: 'GP8 (UART1)', value: Pins.GP8 }
        ];
    }

    get UART_RX_PIN () {
        return [
            { text: 'GP1 (UART0)', value: Pins.GP1 },
            { text: 'GP13 (UART0)', value: Pins.GP13 },
            { text: 'GP17 (UART0)', value: Pins.GP17 },
            { text: 'GP5 (UART1)', value: Pins.GP5 },
            { text: 'GP9 (UART1)', value: Pins.GP9 }
        ];
    }

    get MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.modeMenu.input',
                    default: 'input',
                    description: 'label for input pin mode'
                }),
                value: Mode.Input
            },
            {
                text: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.modeMenu.output',
                    default: 'output',
                    description: 'label for output pin mode'
                }),
                value: Mode.Output
            },
            {
                text: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.modeMenu.inputPullup',
                    default: 'input-pullup',
                    description: 'label for input-pullup pin mode'
                }),
                value: Mode.InputPullup
            },
            {
                text: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.modeMenu.inputPulldown',
                    default: 'input-pulldown',
                    description: 'label for input-pulldown pin mode'
                }),
                value: Mode.InputPulldown
            }
        ];
    }

    get LEVEL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.levelMenu.high',
                    default: 'high',
                    description: 'label for high level'
                }),
                value: Level.High
            },
            {
                text: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.levelMenu.low',
                    default: 'low',
                    description: 'label for low level'
                }),
                value: Level.Low
            }
        ];
    }

    get ANALOG_PINS_MENU () {
        return [
            { text: 'GP26', value: Pins.GP26 },
            { text: 'GP27', value: Pins.GP27 },
            { text: 'GP28', value: Pins.GP28 }
        ];
    }

    get INTERRUP_MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.InterrupModeMenu.risingEdge',
                    default: 'rising edge',
                    description: 'label for rising edge interrup'
                }),
                value: InterrupMode.Rising
            },
            {
                text: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.InterrupModeMenu.fallingEdge',
                    default: 'falling edge',
                    description: 'label for falling edge interrup'
                }),
                value: InterrupMode.Falling
            },
            {
                text: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.InterrupModeMenu.changeEdge',
                    default: 'change edge',
                    description: 'label for change edge interrup'
                }),
                value: InterrupMode.Change
            }
        ];
    }

    get SERIAL_NO_MENU () {
        return [
            { text: '0', value: SerialNo.Serial0 },
            { text: '1', value: SerialNo.Serial1 }
        ];
    }

    get DEFAULT_SERIAL_RX_PIN () {
        return Pins.GP1;
    }

    get DEFAULT_SERIAL_TX_PIN () {
        return Pins.GP0;
    }

    get BAUDTATE_MENU () {
        return [
            { text: '4800', value: Buadrate.B4800 },
            { text: '9600', value: Buadrate.B9600 },
            { text: '19200', value: Buadrate.B19200 },
            { text: '38400', value: Buadrate.B38400 },
            { text: '57600', value: Buadrate.B57600 },
            { text: '76800', value: Buadrate.B76800 },
            { text: '115200', value: Buadrate.B115200 }
        ];
    }

    get EOL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.eolMenu.warp',
                    default: 'warp',
                    description: 'label for warp print'
                }),
                value: Eol.Warp
            },
            {
                text: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.eolMenu.noWarp',
                    default: 'no-warp',
                    description: 'label for no warp print'
                }),
                value: Eol.NoWarp
            }
        ];
    }

    constructor (runtime) {
        this.runtime = runtime;
        this._peripheral = new MicroPythonRaspberryPiPicoW(this.runtime, this.DEVICE_ID);
    }

    getInfo () {
        return [
            {
                id: 'pin',
                name: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.category.pins',
                    default: 'Pins',
                    description: 'The name of the microPython RaspberryPiPico device pin category'
                }),
                color1: '#4C97FF',
                color2: '#3373CC',
                color3: '#3373CC',

                blocks: [
                    {
                        opcode: 'setPinMode',
                        text: formatMessage({
                            id: 'microPythonRaspberryPiPicoW.pins.setPinMode',
                            default: 'set pin [PIN] mode [MODE]',
                            description: 'microPythonRaspberryPiPico set pin mode'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: { type: ArgumentType.STRING, menu: 'pins', defaultValue: this.DEFAULT_PIN },
                            MODE: { type: ArgumentType.STRING, menu: 'mode', defaultValue: Mode.Input }
                        }
                    },
                    {
                        opcode: 'setDigitalOutput',
                        text: formatMessage({
                            id: 'microPythonRaspberryPiPicoW.pins.setDigitalOutput',
                            default: 'set digital pin [PIN] out [LEVEL]',
                            description: 'microPythonRaspberryPiPico set digital pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: { type: ArgumentType.STRING, menu: 'pins', defaultValue: this.DEFAULT_PIN },
                            LEVEL: { type: ArgumentType.STRING, menu: 'level', defaultValue: Level.High }
                        }
                    },
                    {
                        opcode: 'setPwmOutputU16',
                        text: formatMessage({
                            id: 'microPythonRaspberryPiPicoW.pins.setPwmOutputU16',
                            default: 'set pwm pin [PIN] out [OUT]',
                            description: 'microPythonRaspberryPiPico set pwm pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: { type: ArgumentType.STRING, menu: 'pins', defaultValue: this.DEFAULT_PIN },
                            OUT: { type: ArgumentType.UINT16_NUMBER, defaultValue: '65535' }
                        }
                    },
                    '---',
                    {
                        opcode: 'readDigitalPin',
                        text: formatMessage({
                            id: 'microPythonRaspberryPiPicoW.pins.readDigitalPin',
                            default: 'read digital pin [PIN]',
                            description: 'microPythonRaspberryPiPico read digital pin'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: { type: ArgumentType.STRING, menu: 'pins', defaultValue: this.DEFAULT_PIN }
                        }
                    },
                    {
                        opcode: 'readAnalogPin',
                        text: formatMessage({
                            id: 'microPythonRaspberryPiPicoW.pins.readAnalogPin',
                            default: 'read analog pin [PIN]',
                            description: 'microPythonRaspberryPiPico read analog pin'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: { type: ArgumentType.STRING, menu: 'analogPins', defaultValue: Pins.GP26 }
                        }
                    },
                    '---',
                    {
                        opcode: 'setServoOutputU16',
                        text: formatMessage({
                            id: 'microPythonRaspberryPiPicoW.pins.setServoOutputU16',
                            default: 'set servo pin [PIN] out [OUT]',
                            description: 'microPythonRaspberryPiPico set servo pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: { type: ArgumentType.STRING, menu: 'pins', defaultValue: this.DEFAULT_PIN },
                            OUT: { type: ArgumentType.HALF_ANGLE, defaultValue: '90' }
                        }
                    },
                    '---',
                    {
                        opcode: 'attachInterrupt',
                        text: formatMessage({
                            id: 'microPythonRaspberryPiPicoW.pins.attachInterrupt',
                            default: 'attach interrupt pin [PIN] mode [MODE] executes',
                            description: 'microPythonRaspberryPiPico attach interrupt'
                        }),
                        blockType: BlockType.CONDITIONAL,
                        arguments: {
                            PIN: { type: ArgumentType.STRING, menu: 'pins', defaultValue: this.DEFAULT_PIN },
                            MODE: { type: ArgumentType.STRING, menu: 'interruptMode', defaultValue: InterrupMode.Rising }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                menus: {
                    pins: { items: this.PINS_MENU },
                    mode: { items: this.MODE_MENU },
                    analogPins: { items: this.ANALOG_PINS_MENU },
                    level: { acceptReporters: true, items: this.LEVEL_MENU },
                    interruptMode: { items: this.INTERRUP_MODE_MENU }
                }
            },
            {
                id: 'serial',
                name: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.category.serial',
                    default: 'Serial',
                    description: 'The name of the microPython RaspberryPiPico device serial category'
                }),
                color1: '#9966FF',
                color2: '#774DCB',
                color3: '#774DCB',

                blocks: [
                    {
                        opcode: 'raspberryPiPicoWSerialBegin',
                        text: formatMessage({
                            id: 'microPythonRaspberryPiPicoW.serial.raspberryPiPicoSerialBegin',
                            default: 'serial [NO] begin baudrate [BAUD] pin RX [RX_PIN] TX [TX_PIN]',
                            description: 'microPythonRaspberryPiPico multi serial begin'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            NO: { type: ArgumentType.NUMBER, menu: 'serialNo', defaultValue: SerialNo.Serial0 },
                            BAUD: { type: ArgumentType.STRING, menu: 'baudrate', defaultValue: Buadrate.B115200 },
                            RX_PIN: { type: ArgumentType.STRING, menu: 'uartRXPins' },
                            TX_PIN: { type: ArgumentType.STRING, menu: 'uartTXPins' }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'multiSerialPrint',
                        text: formatMessage({
                            id: 'microPythonRaspberryPiPicoW.serial.multiSerialPrint',
                            default: 'serial [NO] print [VALUE] [EOL]',
                            description: 'microPythonRaspberryPiPico multi serial print'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            NO: { type: ArgumentType.NUMBER, menu: 'serialNo', defaultValue: SerialNo.Serial0 },
                            VALUE: { type: ArgumentType.STRING, defaultValue: 'Hello OpenBlock' },
                            EOL: { type: ArgumentType.STRING, menu: 'eol', defaultValue: Eol.Warp }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'multiSerialReadALine',
                        text: formatMessage({
                            id: 'microPythonRaspberryPiPicoW.serial.multiSerialReadALine',
                            default: 'serial [NO] read a line',
                            description: 'MicroPython RaspberryPiPico multi serial read a line'
                        }),
                        arguments: {
                            NO: { type: ArgumentType.NUMBER, menu: 'serialNo', defaultValue: SerialNo.Serial0 }
                        },
                        blockType: BlockType.REPORTER,
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                menus: {
                    baudrate: { items: this.BAUDTATE_MENU },
                    serialNo: { items: this.SERIAL_NO_MENU },
                    uartTXPins: { items: this.UART_TX_PIN },
                    uartRXPins: { items: this.UART_RX_PIN },
                    eol: { items: this.EOL_MENU }
                }
            },
            {
                id: 'console',
                name: formatMessage({
                    id: 'microPythonRaspberryPiPicoW.category.console',
                    default: 'Console',
                    description: 'The name of the RaspberryPiPico microPython device console category'
                }),
                color1: '#FF3399',
                color2: '#CC297A',
                color3: '#CC297A',

                blocks: [
                    {
                        opcode: 'consolePrint',
                        text: formatMessage({
                            id: 'microPythonRaspberryPiPicoW.console.consolePrint',
                            default: 'print [TEXT] [EOL]',
                            description: 'MicrpPython console print'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            TEXT: { type: ArgumentType.STRING, defaultValue: 'Hello OpenBlock' },
                            EOL: { type: ArgumentType.STRING, menu: 'eol', defaultValue: Eol.Warp }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'consoleInput',
                        text: formatMessage({
                            id: 'microPythonRaspberryPiPicoW.console.consoleInput',
                            default: 'prompt [TEXT] and read input',
                            description: 'MicrpPython console input'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            TEXT: { type: ArgumentType.STRING, defaultValue: 'Input a number:' }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                menus: {
                    eol: { items: this.EOL_MENU }
                }
            }
        ];
    }
}

export default OpenBlockMicroPythonRaspberryPiPicoWDevice;
