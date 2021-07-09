Vue.component('inputdata', {
    template:`
        <div>
        <h2>{{ race }}</h2>
        <form class="inputdata-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
            <b>以下の項目を修正してください:</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>

        <p>
            <label for="name">ウマ娘</label>
            <select id="name" v-model="name">
                <option v-for="Name in namelist" :key="Name" :value="Name">{{ Name }}</option>
            </select>
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
        </div>
    `,
    data() {
        return {
            race: 'チームレース履歴登録',
            errors: [],
            name: 'オグリキャップ',
            speed: 800,
            stamina: 800,
            power: 800,
            guts: 800,
            wise: 800,
            ranking: 1,
            list: [],
            namelist: [
                'オグリキャップ','カレンチャン','サイレンススズカ',
                'シンボリルドルフ','スペシャルウィーク','スマートファルコン',
                'セイウンスカイ','タイキシャトル','テイエムオペラオー',
                'トウカイテイオー','ナリタタイシン','ナリタブライアン',
                'ヒシアマゾン','ビワハヤヒデ','マルゼンスキー',
                'ミホノブルボン','メジロマックイーン','ライスシャワー',
                'ウォッカ','エアグルーヴ','エルコンドルパサー',
                'グラスワンダー','ゴールドシップ','スーパークリーク',
                'ダイワスカーレット','マヤノトップガン','アグネスタキオン',
                'ウイニングチケット','キングヘイロー','サクラバクシンオー',
                'ナイスネイチャ','ハルウララ','マチカネフクキタル',
                'メジロライアン'
            ]
        }
    },
    methods:{
        onSubmit() {
            if (this.name && this.speed && stamina && power && guts && wise && ranking) {
                this.name = 'オグリキャップ'
                this.speed = 800
                this.stamina = 800
                this.power = 800
                this.guts = 800
                this.wise = 800
                this.ranking = 1
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
        },
        postMethod(){
            let params = new FormData()
            params.append('value', this.name)
            params.append('value', this.speed)
            params.append('value', this.stamina)
            params.append('value', this.power)
            params.append('value', this.guts)
            params.append('value', this.wise)
            params.append('value', this.ranking)

            firebase.database().ref('board').push({
                params
            })
        }
    },
    created() {
        const stats = 1

        for(let i = 0; i < 1200; i++){
            this.list.push(stats + i)
        }
    }
})

Vue.component('test',{
    template:`
        <h1>test</h1>
    `
})

// var app = new Vue({
//     el: '#app',
//     data: {
//         race: 'チームレース履歴登録',
//         uma:[
//             {
//                 name: 'オグリキャップ',
//                 speed: 800,
//                 stamina: 800,
//                 power: 800,
//                 guts: 800,
//                 wise: 800,
//                 ranking: 1
//             }
//         ]
//     }
// })

const Foo = { 
    template: `
        <div>
            <h2>チームレース履歴</h2>
            <test></test>
        </div>
    ` 
}
const Bar = { 
    template: `
        <div>
            <h2>チームレース履歴削除</h2>
        </div>
    `
}

const Savedata = {
    template:`
        <div id="app">
        <inputdata></inputdata>
        </div>
    `
}
const routes = [
    { path: '/', component: Savedata },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]

  const router = new VueRouter({
    routes // `routes: routes` の短縮表記
  })

  const route = new Vue({
      router
  }).$mount('#route')
