Vue.config.devtools = true
Vue.use(window["vue-js-modal"].default)
const database = firebase.database()
const racedata = "team_race"

Vue.component('inputdata', {
    template:`
        <div>
        <h2>{{ race }}</h2>
        <p>このページではチームレースの結果を入力して保存することができます</p>
        <form class="inputdata-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
            <b>以下の項目を修正してください:</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>

        <p>
            <label for="name">ウマ娘:</label>
            <select id="name" v-model="name">
                <option v-for="Name in namelist" :key="Name" :value="Name">{{ Name }}</option>
            </select>
        </p>

        <p>
            <label for="speed">スピード:</label>
            <select id="speed" v-model.number="speed">
                <option v-for="Speed in list" :key="Speed" :value="Speed">{{ Speed }}</option>
            </select>
        </p>

        <p>
            <label for="stamina">スタミナ:</label>
            <select id="stamina" v-model.number="stamina">
                <option v-for="Stamina in list" :key="Stamina" :value="Stamina">{{ Stamina }}</option>
            </select>
        </p>

        <p>
            <label for="power">パワー:</label>
            <select id="power" v-model.number="power">
                <option v-for="Power in list" :key="Power" :value="Power">{{ Power }}</option>
            </select>
        </p>

        <p>
            <label for="guts">根性:</label>
            <select id="guts" v-model.number="guts">
                <option v-for="Guts in list" :key="Guts" :value="Guts">{{ Guts }}</option>
            </select>
        </p>

        <p>
            <label for="wise">賢さ:</label>
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
            <input type="submit" value="登録する">
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
                const user = firebase.auth().currentUser
                if(user!=null){
                    const uid = user.uid
                
                    database.ref(racedata).child('user/' + uid).push({
                        id: uid,
                        Name: this.name,
                        Speed: this.speed,
                        Stamina: this.stamina,
                        Power: this.power,
                        Guts: this.guts,
                        Wise: this.wise,
                        Ranking: this.ranking
                    })
                }else{
                    alert("ログインしてください")
                }
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
        }
    },
    created() {
        const stats = 1

        for(let i = 0; i < 1200; i++){
            this.list.push(stats + i)
        }
    },
    mounted(){
        firebase.auth().onAuthStateChanged((user) => {
                if(user) {
                    console.log("login")
                    this.authenticatedUser = true
                } else {
                    console.log("logout")
                    this.authenticatedUser = false
                }
            }
        )
    }
})

Vue.component('viewdata',{
    template:`
        <div>
        <h2>チームレース履歴</h2>
        <p>このページではチームレース履歴の確認・編集・削除ができます</p>
        <modal name="detail" :draggable="true" :resizable="true" :width="600" :height="530">
            <div class="modal-body">
                <p>
                <label>
                    ウマ娘:
                </label>
                <select id="updateName" v-model="form.Name">
                    <option v-for="Name in namelist" :key="Name" :value="Name">{{ Name }}</option>
                </select>
                </p>

                <p>
                <label>
                    スピード:
                </label>
                <select id="speed" v-model.number="form.Speed">
                    <option v-for="Speed in list" :key="Speed" :value="Speed">{{ Speed }}</option>
                </select>
                </p>

                <p>
                <label>
                    スタミナ:
                </label>
                <select id="stamina" v-model.number="form.Stamina">
                    <option v-for="Stamina in list" :key="Stamina" :value="Stamina">{{ Stamina }}</option>
                </select>
                </p>

                <p>
                <label>
                    パワー:
                </label>
                <select id="power" v-model.number="form.Power">
                    <option v-for="Power in list" :key="Power" :value="Power">{{ Power }}</option>
                </select>
                </p>
            
                <p>
                <label>
                    根性:
                </label>
                <select id="guts" v-model.number="form.Guts">
                    <option v-for="Guts in list" :key="Guts" :value="Guts">{{ Guts }}</option>
                </select>
                </p>
            
                <p>
                <label>
                    賢さ:
                </label>
                <select id="wise" v-model.number="form.Wise">
                    <option v-for="Wise in list" :key="Wise" :value="Wise">{{ Wise }}</option>
                </select>
                </p>

                <p>
                <label>
                    順位:
                </label>
                <select id ="updateRanking" v-model.number="form.Ranking">
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
                </p>
            
            <button class="update-modal" @click="updateMethod(form.Name,form.Speed,form.Stamina,form.Power,form.Guts,form.Wise,form.Ranking)">
                編集を保存する
            </button>
            </div>
        </modal>
        <table class="table">
            <thead>
                <tr>
                    <td>ウマ娘</td>
                    <th>順位</th>
                    <td>スピード</td>
                    <td>スタミナ</td>
                    <td>パワー</td>
                    <td>根性</td>
                    <td>賢さ</td>
                    <td>データ編集</td>
                    <td>データ削除</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(record, index) in racerecord" :key="index">
                    <td>
                        {{ record.Name }}
                    </td>
                    <th>
                        {{ record.Ranking }}
                    </th>
                    <td>
                        {{ record.Speed }}
                    </td>
                    <td>
                        {{ record.Stamina }}
                    </td>
                    <td>
                        {{ record.Power }}
                    </td>
                    <td>
                        {{ record.Guts }}
                    </td>
                    <td>
                        {{ record.Wise }}
                    </td>
                    <td>
                        <button class="update" @click="onEdit(index)">
                            データ編集
                        </button>
                    </td>
                    <td>
                        <button class="delete" @click="deleteMethod(index)">
                            データ削除
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    `,
    data(){
        return {
            racerecord: [],
            form: {},
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
        getMethod(user) {
            console.log(user)
            if(user!=null){
                const uid = user.uid
                database.ref(racedata).on("value",(snapshot) => {
                    const datalist = snapshot.child('user/' +uid).val()
                    this.racerecord = datalist
    
                })
            }
        },
        deleteMethod(key) {
            const user = firebase.auth().currentUser
            if(user!=null){
                const uid = user.uid
                database.ref(racedata).child('user/' + uid + '/' + key).remove()
            }
        },
        onEdit(index) {
            this.$modal.show('detail')
            this.currentTargetIndex = index
            this.form = Object.assign({}, this.racerecord[index])
        },
        updateMethod(Name, Speed, Stamina, Power, Guts, Wise, Ranking){
            updatedata={
                Name:Name,
                Speed:Speed,
                Stamina:Stamina,
                Power:Power,
                Guts:Guts,
                Wise:Wise,
                Ranking:Ranking
            }
            const user = firebase.auth().currentUser
            if(user!=null){
                const uid = user.uid
                database.ref(racedata).child('user/' + uid + '/' + this.currentTargetIndex).update(updatedata)
                this.$modal.hide('detail')
            }
        }
    },
    created() {
        const stats = 1

        for(let i = 0; i < 1200; i++){
            this.list.push(stats + i)
        }
    },
    mounted(){
        firebase.auth().onAuthStateChanged((user) => {
                if(user) {
                    this.getMethod(user)
                    console.log("login")
                    this.authenticatedUser = true
                } else {
                    console.log("logout")
                    this.authenticatedUser = false
                }
            }
        )
    }
})

Vue.component('login',{
    template: `
        <div class="container mt-5">
            <button class="btn btn-primary mb-3" @click="logoutUser" v-if="authenticatedUser">ログアウト</button>
            <div class="row" v-else>
                <div class="col-sm-6">
                    <h2>新規ユーザ登録</h2>
                    <form @submit.prevent="registerUser">
                        <div class="form-group">
                            <label for="email">メールアドレス:</label>
                            <input type="email" class="form-control" id="email" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password">パスワード:</label>
                            <input type="password" class="form-control" id="password" v-model="password">
                        </div>
                        <button type="submit" class="btn btn-info">登録する</button>
                    </form>
                </div>

                <div class="col-sm-6">
                    <h2>ログイン</h2>
                    <form @submit.prevent="loginUser">
                        <div class="form-group">
                            <label for="loginEmail">メールアドレス:</label>
                            <input type="loginEmail" class="form-control" id="loginEmail" v-model="loginEmail">
                        </div>
                        <div class="form-group">
                            <label for="loginPassword">パスワード:</label>
                            <input type="loginPassword" class="form-control" id="loginPassword" v-model="loginPassword"> 
                        </div>
                        <button type="submit" class="btn btn-info">ログイン</button>
                    </form>
                </div>
            </div>
        </div>
    `,
    data(){
        return {
            email: '',
            password: '',
            loginEmail: '',
            loginPassword: '',
            authenticatedUser: ''
        }
    },
    methods:{
        registerUser(){
            firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
            .then(
                (userCredential) => {
                    console.log(userCredential)
                    // this.createNewUser()
                    this.$router.replace('/')
                },
                (err) => {
                    let errorCode = err.code
                    let errorMessage = err.message
                    alert(errorCode, errorMessage)
                }
            )
            .catch(
                function(error){
                    var errorCode = error.code
                    var errorMessage = error.message
                    console.log(errorCode)
                    console.log(errorMessage)
                }
            )
        },
        logoutUser(){
            firebase.auth().signOut()
          },
        loginUser(){
            firebase.auth().signInWithEmailAndPassword(this.loginEmail,this.loginPassword)
            .then(()=>{
                this.loginEmail = ''
                this.loginPassword = ''
            })
            .catch(
                function(error){
                    var errorCode = error.code
                    var errorMessage = error.message
                    console.log(errorCode)
                    console.log(errorMessage)
                }
            )
        }
    },
    mounted(){
        firebase.auth().onAuthStateChanged((user) => {
                if(user) {
                    console.log("login")
                    this.authenticatedUser = true
                } else {
                    console.log("logout")
                    this.authenticatedUser = false
                }
            }
        )
    }
})

const View = { 
    template: `
        <div>
            <viewdata></viewdata>
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

const login = {
    template: `
        <div>
            <login></login>
        </div>
    `
}

const routes = [
    { path: '/', component: Savedata },
    { path: '/viewdata', component: View },
    { path: '/login', component: login}
  ]

  const router = new VueRouter({
    routes // `routes: routes` の短縮表記
  })

  const route = new Vue({
      router
  }).$mount('#route')
