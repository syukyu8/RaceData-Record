Vue.component('inputdata', {
    template:`
        <form class="inputdata-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
            <b>以下の項目を修正してください:</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>

        <p>
            <label for="name">ウマ娘</label>
            <input id="name" v-model="name">
        </p>

        <p>
            <label for="speed">スピード</label>
            <select id="speed" v-model.number="speed">
                <option v-for="Speed in list" :key="Speed" :value="Speed">{{ Speed }}</option>
            </select>
        </p>

        <p>
            <label for="stamina">スタミナ</label>
            <select id="stamina" v-model.number="stamina">
                <option v-for="Stamina in list" :key="Stamina" :value="Stamina">{{ Stamina }}</option>
            </select>
        </p>

        <p>
            <label for="power">パワー</label>
            <select id="power" v-model.number="power">
                <option v-for="Power in list" :key="Power" :value="Power">{{ Power }}</option>
            </select>
        </p>

        <p>
            <label for="guts">根性</label>
            <select id="guts" v-model.number="guts">
                <option v-for="Guts in list" :key="Guts" :value="Guts">{{ Guts }}</option>
            </select>
        </p>

        <p>
            <label for="wise">賢さ</label>
            <select id="wise" v-model.number="wise">
                <option v-for="Wise in list" :key="Wise" :value="Wise">{{ Wise }}</option>
            </select>
        </p>

        <p>
            <label for="ranking">順位:</label>
            <select id="ranking" v-model.number="ranking">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
            </select>
        <p>
            <input type="submit" value="Submit">
        </p>

        </form>
    `,
    data() {
        return {
            errors: [],
            name: null,
            speed: 800,
            stamina: 800,
            power: 800,
            guts: 800,
            wise: 800,
            ranking: null,
            list: [],
        }
    },
    methods:{
        onSubmit() {
            if (this.name && this.speed && stamina && power && guts && wise && ranking) {
                this.name = null
                this.speed = null
                this.stamina = null
                this.power = null
                this.guts = null
                this.wise = null
                this.ranking = null
            }
            else{
                if (!this.name) this.errors.push('名前を入力してください.')
                if (!this.speed) this.errors.push('speed required.')
                if (!this.stamina) this.errors.push('stamina required.')
                if (!this.power) this.errors.push('power required.')
                if (!this.guts) this.errors.push('guts required.')
                if (!this.wise) this.errors.push('wise required.')
                if (!this.ranking) this.errors.push('ranking required.')
            }
        }
    },
    created() {
        const stats = 1

        for(let i = 0; i < 1200; i++){
            this.list.push(stats + i)
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        race: 'チームレース履歴登録',
        uma:[
            {
                name: 'ウマ娘',
                speed: 'スピード',
                stamina: 'スタミナ',
                power: 'パワー',
                guts: '根性',
                wise: '賢さ',
                ranking: '順位'
            }
        ]
    }
})
