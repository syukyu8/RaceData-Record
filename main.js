Vue.component('inputdata', {
    template:`
        <form class="inputdata-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
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
            <textarea id="speed" v-model="speed"></textarea>
        </p>

        <p>
            <label for="stamina">スタミナ</label>
            <textarea id="stamina" v-model="stamina"></textarea>
        </p>

        <p>
            <label for="power">パワー</label>
            <textarea id="power" v-model="power"></textarea>
        </p>

        <p>
            <label for="guts">根性</label>
            <textarea id="guts" v-model="guts"></textarea>
        </p>

        <p>
            <label for="wise">賢さ</label>
            <textarea id="wise" v-model="wise"></textarea>
        </p>

        <p>
            <label for="ranking">順位:</label>
            <select id="ranking" v-model.number="ranking">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
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
            speed: null,
            stamina: null,
            power: null,
            guts: null,
            wise: null,
            ranking: null
        }
    },
    methods:{
        onsubmit() {
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
                if (!this.name) this.errors.push('name required.')
                if (!this.speed) this.errors.push('speed required.')
                if (!this.stamina) this.errors.push('stamina required.')
                if (!this.power) this.errors.push('power required.')
                if (!this.guts) this.errors.push('guts required.')
                if (!this.wise) this.errors.push('wise required.')
                if (!this.ranking) this.errors.push('ranking required.')
            }
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
