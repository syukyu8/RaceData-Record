// chromeでDevtoolsを使うための設定
Vue.config.devtools = true
// modalウインドウ作るためにvue-js-modalを使う
Vue.use(window["vue-js-modal"].default)
// Realtime Databaseを使うためにfirebase.databaseのインスタンスを生成
const database = firebase.database()
// team_raceという名前のデータベースに保存する
const racedata = "team_race"

// チームレースのデータを登録する'inputdata'コンポーネント
Vue.component('inputdata', {
    template:`
        <div>
            <h2>{{ race }}</h2>
            <p>このページではチームレースの結果を入力して保存することができます</p>
            
            <!-- データ登録フォーム作成 -->
            <!-- submitした時にonSubmitを呼び出す -->
            <form class="inputdata-form" @submit.prevent="onSubmit">

                <!-- フォームの入力が正しくなかった時 -->
                <!-- 正しくない箇所を表示する -->
                <!-- 全てselectにしているのでエラー出ることないかも？ -->
                <p v-if="errors.length">
                    <b>以下の項目を修正してください:</b>
                    <ul>
                        <li v-for="error in errors">{{ error }}</li>
                    </ul>
                </p>

                <!-- ウマ娘の名前を選択させる -->
                <!-- namaelistに登録されたウマ娘の名前から選択できる -->
                <!-- デフォルトはオグリキャップ -->
                <p>
                    <label for="name">ウマ娘:</label>
                    <select id="name" v-model="name">
                        <option v-for="Name in namelist" :key="Name" :value="Name">{{ Name }}</option>
                    </select>
                </p>

                <!-- スピードの値を選択させる -->
                <!-- listを使って1から1200の値を選択できる -->
                <!-- デフォルトは800 -->
                <p>
                    <label for="speed">スピード:</label>
                    <select id="speed" v-model.number="speed">
                        <option v-for="Speed in list" :key="Speed" :value="Speed">{{ Speed }}</option>
                    </select>
                </p>

                <!-- スタミナの値を選択させる -->
                <!-- listを使って1から1200の値を選択できる -->
                <!-- デフォルトは800 -->
                <p>
                    <label for="stamina">スタミナ:</label>
                    <select id="stamina" v-model.number="stamina">
                        <option v-for="Stamina in list" :key="Stamina" :value="Stamina">{{ Stamina }}</option>
                    </select>
                </p>

                <!-- パワーの値を選択させる -->
                <!-- listを使って1から1200の値を選択できる -->
                <!-- デフォルトは800 -->
                <p>
                    <label for="power">パワー:</label>
                    <select id="power" v-model.number="power">
                        <option v-for="Power in list" :key="Power" :value="Power">{{ Power }}</option>
                    </select>
                </p>

                <!-- 根性の値を選択させる -->
                <!-- listを使って1から1200の値を選択できる -->
                <!-- デフォルトは800 -->
                <p>
                    <label for="guts">根性:</label>
                    <select id="guts" v-model.number="guts">
                        <option v-for="Guts in list" :key="Guts" :value="Guts">{{ Guts }}</option>
                    </select>
                </p>

                <!-- 賢さの値を選択させる -->
                <!-- listを使って1から1200の値を選択できる -->
                <!-- デフォルトは800 -->
                <p> 
                    <label for="wise">賢さ:</label>
                    <select id="wise" v-model.number="wise">
                        <option v-for="Wise in list" :key="Wise" :value="Wise">{{ Wise }}</option>
                    </select>
                </p>

                <!-- 順位を選択させる -->
                <!-- 1から12まで選択できる -->
                <!-- デフォルトは1 -->
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
                </p>

                <!-- submitするボタン -->
                <p>
                    <input type="submit" value="登録する">
                </p>

            
            </form>
        </div>
    `,
    data() {
        return {
            race: 'チームレース履歴登録',
            errors: [],            // errorの内容を入れるリスト
            name: 'オグリキャップ',   // 名前を選択する時のデフォルト
            speed: 800,            // スピードの値を選択する時のデフォルト
            stamina: 800,          // スタミナの値を選択する時のデフォルト
            power: 800,            // パワーの値を選択する時のデフォルト
            guts: 800,             // 根性の値を選択する時のデフォルト
            wise: 800,             // 賢さの値を選択する時のデフォルト
            ranking: 1,            // 順位を選択する時のデフォルト
            list: [],              // ループさせるためのリスト
            // ウマ娘の名前リスト
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
        // submitされた時に呼ばれる
        // 選択されたname,speed,stamina,power,guts,wise,rankingの値をデータベースに登録する
        onSubmit() {
            // 全ての値が存在する時
            if (this.name && this.speed && stamina && power && guts && wise && ranking) {
                // 現在ログインしているユーザの情報を調べる
                const user = firebase.auth().currentUser
                // ログインしている場合
                if(user!=null){
                    // ユーザのid
                    const uid = user.uid
                    
                    // データベースの'team_race/user/ユーザid'の場所にデータを登録する
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
                    alert("登録しました")
                }else{ // ログインしていない場合
                    alert("ログインしてください") // アラートを表示する
                }

                // 選択された値をデフォルトに戻す
                this.name = 'オグリキャップ'
                this.speed = 800
                this.stamina = 800
                this.power = 800
                this.guts = 800
                this.wise = 800
                this.ranking = 1
            }
            else{ // エラー文をerrorsリストに追加する
                if (!this.name) this.errors.push('名前を選択してください.')
                if (!this.speed) this.errors.push('スピードの値を選択してください.')
                if (!this.stamina) this.errors.push('スタミナの値を選択してください.')
                if (!this.power) this.errors.push('パワーの値を選択してください.')
                if (!this.guts) this.errors.push('根性の値を選択してください.')
                if (!this.wise) this.errors.push('賢さの値を選択してください.')
                if (!this.ranking) this.errors.push('順位を選択してください.')
            }
        }
    },
    created() {
        const stats = 1
        // v-forで1200回ループさせる用のlistを作成する
        for(let i = 0; i < 1200; i++){
            this.list.push(stats + i)
        }
    },
    mounted(){
        // ユーザがログインしているかどうか確認する
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

// チームレースのデータを閲覧し・編集・削除する'viewdata'コンポーネント
Vue.component('viewdata',{
    template:`
        <div>
            <h2>チームレース履歴</h2>
            <p>このページではチームレース履歴の確認・編集・削除ができます</p>
            <!-- データ編集用のモーダルウインドウ -->
            <!-- 登録のやり方は'inputdata'と同じ -->
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
                    <!-- このボタンを押すとupdateMethodを呼び出す  -->
                    <button class="update-modal" @click="updateMethod(form.Name,form.Speed,form.Stamina,form.Power,form.Guts,form.Wise,form.Ranking)">
                        編集を保存する
                    </button>
                </div>
            </modal>
            <!-- データ削除用のモーダルウインドウ -->
            <!-- 削除するかどうかの確認を行う -->
            <modal name="delete-detail" :draggable="true" :resizable="true" :width="350" :height="250">
                <div class="modal-hedder">
                    <h2>確認</h2>
                </div>
                <div class="modal-body-delete">
                    <p>本当に削除してもよろしいですか？</p>
                    <!-- いいえを押すとoffDeleteを呼び出す -->
                    <button class="delete" @click="offDelete()">
                        いいえ
                    </button>
                    <!-- はいを押すとdeleteMethodを呼び出す -->
                    <button class="delete" @click="deleteMethod(currentTargetIndex)">
                        はい
                    </button>
                </div>
            </modal>
            <!-- チームレースのデータを表示するテーブル -->
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
                    <!-- 登録されているデータの数だけループする -->
                    <!-- racerecord内にあるウマ娘の名前,順位,スピード,スタミナ,パワー,根性,賢さを表示する -->
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
                            <!-- ボタンを押すとonEditを呼び出す -->
                            <!-- モーダルウインドウが表示され、データの編集が可能になる -->
                            <button class="update" @click="onEdit(index)"> 
                                データ編集
                            </button>
                        </td>
                        <td>
                            <!-- ボタンを押すとonDeleteを呼び出す -->
                            <!-- モーダルウインドウが表示され、データの削除が可能になる -->
                            <button class="delete" @click="onDelete(index)">
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
            racerecord: [], // データ表示用のリスト
            form: {}, // データ編集用のリスト
            list: [], // 1200回ループ用のリスト
            // ウマ娘の名前リスト
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
        // チームレース履歴確認のページが開かれ、ログインしている場合に呼ばれる
        getMethod(user) {
            console.log(user)
            if(user!=null){
                // ユーザのidを取得
                const uid = user.uid
                database.ref(racedata).on("value",(snapshot) => {
                    // 'team_race/user/ユーザid'に登録されているデータを取得
                    const datalist = snapshot.child('user/' +uid).val()
                    // データ表示用のリストに格納
                    this.racerecord = datalist
    
                })
            }
        },
        // 削除用モーダルウインドウの画面で'はい'を押した時に呼ばれる
        deleteMethod(key) {
            // 現在ログインしているユーザの情報を調べる
            const user = firebase.auth().currentUser
            // ログインしている場合
            if(user!=null){
                // ユーザid取得
                const uid = user.uid
                // 'team_race/user/ユーザid/登録されたデータのid'にあるデータを削除する
                database.ref(racedata).child('user/' + uid + '/' + key).remove()
            }
            this.$modal.hide('delete-detail') // モーダルウインドウを閉じる
        },
        // データ編集を押した時に呼ばれる
        onEdit(index) {
            // モーダルウインドウを表示する
            this.$modal.show('detail')
            // 選択されたデータのidを取得する
            this.currentTargetIndex = index
            // 編集用リストに選択されたデータの情報を格納する
            this.form = Object.assign({}, this.racerecord[index])
        },
        // データ削除を押した時に呼ばれる
        onDelete(index) {
            // モーダルウインドウを表示する
            this.$modal.show('delete-detail')
            // 選択されたデータのidを取得する
            this.currentTargetIndex = index
        },
        // データ削除モーダルの確認で'いいえ'を押した時呼ばれる
        offDelete() {
            // モーダルウインドウを閉じる
            this.$modal.hide('delete-detail')
        },
        // モーダルウインドウで'編集を保存する'が押された時に呼ばれる
        updateMethod(Name, Speed, Stamina, Power, Guts, Wise, Ranking){
            // 選択されたデータの値を格納する
            updatedata={
                Name:Name,
                Speed:Speed,
                Stamina:Stamina,
                Power:Power,
                Guts:Guts,
                Wise:Wise,
                Ranking:Ranking
            }
            // 現在ログインしているユーザの情報を調べる
            const user = firebase.auth().currentUser
            // ログインしている場合
            if(user!=null){
                // ユーザid取得
                const uid = user.uid
                // 'team_race/user/ユーザid/編集するデータid'のデータを編集する
                database.ref(racedata).child('user/' + uid + '/' + this.currentTargetIndex).update(updatedata)
                // モーダルウインドウを閉じる
                this.$modal.hide('detail')
            }
        }
    },
    created() {
        const stats = 1
        // v-forで1200回ループさせる用のlistを作成する
        for(let i = 0; i < 1200; i++){
            this.list.push(stats + i)
        }
    },
    mounted(){
        // ユーザがログインしているかどうか確認する
        firebase.auth().onAuthStateChanged((user) => {
                if(user) { // ログインしている場合
                    this.getMethod(user) // データベースに登録されているデータを表示する
                    console.log("login")
                    this.authenticatedUser = true
                } else { // ログインしていない場合
                    console.log("logout")
                    this.authenticatedUser = false
                    alert("ログインしなければデータは確認できません") // ログインしろとアラートを出す
                }
            }
        )
    }
})

// 新規登録・ログイン・ログアウトする'login'コンポーネント
Vue.component('login',{
    template: `
        <div class="container mt-5">
            <div v-if="authenticatedUser"> <!-- ログインしている場合表示される -->
                <h2>ログアウト</h2>
                <p>ログイン済みです</p>
                <p>チームレースの結果を登録したり、チームレースの結果を閲覧できます</p>
                <p>↓ログアウトはこちらから</p>
                <!-- ログアウトのボタンを押すとlogoutUserが呼ばれる -->
                <button class="btn btn-primary mb-3" @click="logoutUser">ログアウト</button>
            </div>
            <div class="row" v-else> <!-- ログアウトしている場合表示される -->
                <div class="col-sm-6">
                    <h2>新規ユーザ登録</h2>
                    <!-- 新規ユーザ登録するフォーム -->
                    <!-- submitする時にregisterUserが呼ばれる -->
                    <form @submit.prevent="registerUser">
                    <!-- メールアドレスとパスワードを入力させる -->
                        <div class="form-group">
                            <label for="email">メールアドレス:</label>
                            <input type="email" class="form-control" id="email" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password">パスワード:</label>
                            <input type="password" class="form-control" id="password" v-model="password">
                        </div>
                        <!-- submitするボタン -->
                        <button type="submit" class="btn btn-info">登録する</button>
                    </form>
                </div>

                <div class="col-sm-6">
                    <h2>ログイン</h2>
                    <!-- ログインするフォーム -->
                    <!-- submitするとloginUserが呼ばれる -->
                    <form @submit.prevent="loginUser">
                        <!-- メールアドレスとパスワードを入力させる -->
                        <div class="form-group">
                            <label for="loginEmail">メールアドレス:</label>
                            <input type="loginEmail" class="form-control" id="loginEmail" v-model="loginEmail">
                        </div>
                        <div class="form-group">
                            <label for="loginPassword">パスワード:</label>
                            <input type="loginPassword" class="form-control" id="loginPassword" v-model="loginPassword"> 
                        </div>
                        <!-- submitするボタン -->
                        <button type="submit" class="btn btn-info">ログイン</button>
                    </form>
                </div>
            </div>
        </div>
    `,
    data(){
        return {
            email: '', // 新規メールアドレス用
            password: '', // 新規パスワード用
            loginEmail: '', // ログインメールアドレス用
            loginPassword: '', // ログインパスワード用
            authenticatedUser: '' // ログインしてるかどうか確認する用
        }
    },
    methods:{
        // 新規ユーザ登録するフォームをsubmitした際に呼ばれる
        // Firebase Authenticationを使って認証機能を作成する
        registerUser(){
            // 新しいアカウントを作成する
            firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
            .then(
                // 作成するとそのままサインインした状態になる
                (userCredential) => {
                    console.log(userCredential)
                    // アカウント登録するとチームレースデータを登録するページに遷移する
                    this.$router.replace('/')
                },
                (err) => { // エラーが起きた場合の処理
                           // アラートでエラー内容を表示する
                    let errorCode = err.code
                    let errorMessage = err.message
                    alert(errorCode, errorMessage)
                }
            )
            // アカウント作成でエラーが起きた場合の処理
            .catch(
                function(error){
                    var errorCode = error.code
                    var errorMessage = error.message
                    console.log(errorCode)
                    console.log(errorMessage)
                }
            )
        },
        // ログアウトボタンが押された場合に呼ばれる
        // ログアウトさせる
        logoutUser(){
            firebase.auth().signOut()
            .then(function(){
                alert("ログアウトしました")
            })
          },
        // ログインボタンが押された場合に呼ばれる
        // メールアドレスとパスワードを用いてログイン処理を行う
        loginUser(){
            firebase.auth().signInWithEmailAndPassword(this.loginEmail,this.loginPassword)
            .then(()=>{
                // ログインできた後は入力フォームを初期化する
                this.loginEmail = ''
                this.loginPassword = ''
            })
            .catch( // エラーが起きた場合の処理
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
        // ユーザがログインしているかどうか確認する
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

// 'viewdata'を持つルートコンポーネント
const View = { 
    template: `
        <div>
            <viewdata></viewdata>
        </div>
    ` 
}

// 'inputdata'を持つルートコンポーネント
const Savedata = {
    template:`
        <div>
        <inputdata></inputdata>
        </div>
    `
}

// 'login'を持つルートコンポーネント
const login = {
    template: `
        <div>
            <login></login>
        </div>
    `
}

// ルートのパス設定
const routes = [
    { path: '/', component: Savedata },
    { path: '/viewdata', component: View },
    { path: '/login', component: login}
  ]

  const router = new VueRouter({
    routes // `routes: routes` の短縮表記
  })

  // rootとなるインスタンスを生成してマウントする
  // this.$routeでアクセスできるようになる
  const route = new Vue({
      router
  }).$mount('#route')
