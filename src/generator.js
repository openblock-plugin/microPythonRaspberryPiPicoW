export default Blockly => {
    Blockly.Python.microPython_pin_setPinMode = function (block) {
        const pin = block.getFieldValue('PIN');
        const mode = block.getFieldValue('MODE') || 'IN';

        Blockly.Python.imports_.Pin = 'from machine import Pin';
        Blockly.Python.globalsVariables_[`pin${pin}`] = `pin${pin}`;

        if (mode === 'IN' || mode === 'OUT') {
            return `pin${pin} = Pin(${pin}, Pin.${mode})\n`;
        }
        return `pin${pin} = Pin(${pin}, Pin.IN, Pin.${mode})\n`;
    };

    Blockly.Python.microPython_pin_menu_level = function (block) {
        const code = block.getFieldValue('level') || '0';
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python.microPython_pin_setDigitalOutput = function (block) {
        const pin = block.getFieldValue('PIN') || '0';
        const level = Blockly.Python.valueToCode(block, 'LEVEL', Blockly.Python.ORDER_FUNCTION_CALL) || '1';
        return `pin${pin}.value(${level})\n`;
    };

    Blockly.Python.microPython_pin_setPwmOutput = function (block) {
        const pin = block.getFieldValue('PIN');
        const outValue = Blockly.Python.valueToCode(block, 'OUT', Blockly.Python.ORDER_FUNCTION_CALL) || '0';

        Blockly.Python.imports_.Pin = 'from machine import Pin';
        Blockly.Python.imports_.PWM = 'from machine import PWM';
        Blockly.Python.variables_[`PWM${pin}`] = `pwm${pin} = PWM(Pin(${pin}), freq = 490)`;

        return `pwm${pin}.duty_u16(${outValue})\n`;
    };

    Blockly.Python.microPython_pin_readDigitalPin = function (block) {
        const pin = block.getFieldValue('PIN');
        return [`pin${pin}.value()`, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python.microPython_pin_readAnalogPin = function (block) {
        const pin = block.getFieldValue('PIN');

        Blockly.Python.imports_.Pin = 'from machine import Pin';
        Blockly.Python.imports_.ADC = 'from machine import ADC';
        Blockly.Python.variables_[`ADC${pin}`] = `adc${pin} = ADC(Pin(${pin}))`;

        return [`adc${pin}.read_u16()`, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python.microPython_pin_setServoOutput = function (block) {
        const pin = block.getFieldValue('PIN') || '0';
        const out = Blockly.Python.valueToCode(block, 'OUT', Blockly.Python.ORDER_FUNCTION_CALL) || '0';

        Blockly.Python.imports_.Pin = 'from machine import Pin';
        Blockly.Python.imports_.PWM = 'from machine import PWM';
        Blockly.Python.variables_[`PWM${pin}`] = `pwm${pin} = PWM(Pin(${pin}), freq = 50)`;

        Blockly.Python.libraries_.GetServoPulseU16 = 'def getServoPulse(angle):\n' +
            '  SERVO_MIN_PULSE_WIDTH = 544\n' +
            '  SERVO_MAX_PULSE_WIDTH = 2400\n\n' +
            '  if(angle > 180):\n' +
            '    angle = 180\n' +
            '  elif(angle < 0):\n' +
            '    angle = 0\n' +
            '  return int((SERVO_MIN_PULSE_WIDTH + (SERVO_MAX_PULSE_WIDTH - SERVO_MIN_PULSE_WIDTH) * angle / 180) / (200 * 100 / 65535))\n'; // eslint-disable-line max-len

        return `pwm${pin}.duty_u16(getServoPulse(${out}))\n`;
    };

    Blockly.Python.microPython_pin_attachInterrupt = function (block) {
        const pin = block.getFieldValue('PIN');
        const mode = block.getFieldValue('MODE') || 'RISING';

        let branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
        branch = Blockly.Python.addLoopTrap(branch, block.id);

        if (branch) {
            const variablesName = [];
            for (const x in Blockly.Python.variables_) {
                variablesName.push(Blockly.Python.variables_[x].slice(0, Blockly.Python.variables_[x].indexOf('=') - 1)); // eslint-disable-line max-len
            }
            if (variablesName.length !== 0) {
                branch = `${Blockly.Python.INDENT}global ${variablesName.join(', ')}\n${branch}`;
            }
        } else {
            branch = `${Blockly.Python.INDENT}pass\n`;
        }

        Blockly.Python.imports_.Pin = 'from machine import Pin';
        Blockly.Python.libraries_[`ISR${mode}${pin}`] =
            `def ISR_${mode}_${pin}(pin):\n${branch}`;

        if (mode === 'CHANGE') {
            return `pin${pin}.irq(handler = ISR_${mode}_${pin}, trigger = (Pin.IRQ_RISING or Pin.IRQ_FALLING))\n`;
        }
        return `pin${pin}.irq(handler = ISR_${mode}_${pin}, trigger = Pin.IRQ_${mode})\n`;
    };

    Blockly.Python.microPython_serial_serialBegin = function (block) {
        const no = block.getFieldValue('NO');
        const baud = block.getFieldValue('BAUD');
        const txPin = block.getFieldValue('TX_PIN');
        const rxPin = block.getFieldValue('RX_PIN');

        Blockly.Python.imports_.UART = 'from machine import UART';
        Blockly.Python.imports_.Pin = 'from machine import Pin';
        Blockly.Python.globalsVariables_[`uart${no}`] = `uart${no}`;

        const code = `uart${no} = UART(${no}, baudrate = ${baud
        }, tx = Pin(${txPin}), rx = Pin(${rxPin}))\n`;

        return code;
    };

    Blockly.Python.microPython_serial_multiSerialPrint = function (block) {
        const no = block.getFieldValue('NO');
        const value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_UNARY_SIGN) || '';
        const eol = block.getFieldValue('EOL');

        let warp = '';
        if (eol === 'warp') {
            warp = ' + \'\\r\\n\'';
        }
        return `uart${no}.write(str(${value})${warp})\n`;
    };

    Blockly.Python.microPython_serial_multiSerialReadALine = function (block) {
        const no = block.getFieldValue('NO');
        return [`uart${no}.read()`, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python.microPython_console_consolePrint = function (block) {
        const msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_UNARY_SIGN) || '';
        const eol = block.getFieldValue('EOL') || 'warp';

        if (eol === 'warp') {
            return `print(${msg})\n`;
        }
        return `print(${msg}, end = '')\n`;
    };

    Blockly.Python.microPython_console_consoleInput = function (block) {
        const msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_FUNCTION_CALL) || '';
        const code = `input(${msg})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    // Legacy generator aliases, kept for backward compatibility.
    Blockly.Python.microPython_serial_raspberryPiPicoWSerialBegin = Blockly.Python.microPython_serial_serialBegin;

    return Blockly;
};
