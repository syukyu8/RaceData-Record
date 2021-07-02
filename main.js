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

var inputdata = new Vue({
    el: '#inputdata',
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