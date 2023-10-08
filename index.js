const { createApp } = Vue;

createApp({
    data() {
        return {
            display: 0,
            number1: "",
            operator: "",
            number2: "",
            result: "",
            end: false
        }
    },
    
    mounted() {
        window.addEventListener('keydown', this.onKeyPress);
    },
 
    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyPress);
    },
    methods: {
        addNum(num) {
            if(this.end === true) {
                this.clear();
            }
            if(this.operator === "") {
                if(num =="." && this.number1.includes(".")) {
                    num = "";
                }
                this.number1 += num;
            } else {
                if(num =="." && this.number2.includes(".")) {
                    num = "";
                }
                this.number2 += num;
            }
            this.updateDisplay();
        },
        addOp(op) {
            if(this.number1 != "" && this.end === false) {
                this.operator = ` ${op} `;
                this.updateDisplay();
            }
        },
        updateDisplay() {
            this.display = this.number1 + this.operator + this.number2;
        },
        clear() {
            this.number1 = this.number2 = this.operator = this.result = "";
            this.display = 0;
            this.end = false;
        },
        convertToInt(number) {
            return number % 1 === 0 ? parseInt(number) : number;
        },
        equal() {
            if(this.number2 != "" && this.result == "") {
                this.number1 = parseFloat(this.number1);
                this.number2 = parseFloat(this.number2);
                this.result = eval(this.number1 + this.operator + this.number2).toFixed(2);
                this.result = this.convertToInt(this.result);
                this.display += ` = ${this.result}`;
                this.end = true;
            }
        },
        onKeyPress(event) {
            let key = event.key;
            const ops = /[+\-*/]/;
            const del = ['Backspace', 'Delete', 'Escape'];
            const dot = ['.', ',', ';'];

            if(!isNaN(key)) {
                this.addNum(key);
            } else if(dot.includes(key)) {
                this.addNum('.')
            } else if(ops.test(key)) {
                this.addOp(key);
            } else if(del.includes(key)) {
                this.clear();
            } else if(key == 'Enter') {
                this.equal();
            }
        }
    }
}).mount("#app");