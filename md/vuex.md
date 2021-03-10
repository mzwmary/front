# vuex安装

# vuex是什么？

Vuex就是在一个项目中，提供唯一的管理数据源的仓库。

# vuex 结构目录

# vuex文件解析

## state.js

__作用：__

1. 存放初始值
2. 可以直接使用this.$store.state获取
3. 辅助函数为mapState，需在组件computed属性中绑定，将state映射到组件的计算属性当中

__示例：__

    ```js
    export default {
        api_version: '1.0.0', // 接口版本
        api_host: 'http://47.75.157.75:8084', // 接口地址
        ws_url: 'ws://dev.omo.yunoso.cc:3458/', // WebSocket地址
        token: null, // 用户Token
        user: null, // 用户
        keyMap: null, // 字典
    };
    ```

__组件内使用：__

    ```js
    import {mapState} from 'vuex'

    export default {
      computed: mapState({
        count: state => state.count
      })
    }
    ```

## mutations.js

__作用：__

1. 用于state状态变更。
2. Mutations的中文意思是“变化”，利用它可以更改状态，本质就是用来处理数据的函数，__其接收唯一参数值state__。
3. 定义的mutation__必须是同步函数__，否则devtool中的数据将可能出现问题，使状态改变变得难以跟踪。
4. store.commit(mutationName)是用来触发一个mutation的方法。
5. 辅助函数mapMutations([mutationName])
6. 需绑定在组件methods上面。

__示例：__

    ```js
    export default {
        mutationName(state) {
            //在这里改变state中的数据
        }
    }
    ```

__组件内使用__

    ```js
    this.$store.commit('mutationName')
    }
    ```

或者使用辅助函数mapMutations直接将触发函数映射到methods上，这样就能在元素事件绑定上直接使用了。如：

    ```js
    import {mapMutations} from 'vuex'

    //我是一个组件
    export default {
        methods: mapMutations([
            'mutationName'
        ])
    }
    ```

## actions.js

__作用：__

1. 用于改变状态，通过触发mutation实现。
2. __可异步操作__。
3. 可使用this.$store.dispatch(actionName)方法。
4. 辅助函数为mapActions([actionName])。
5. 需绑定在组件methods上面。

__示例：__

    ```js
    export default{
        action (context) {
            //异步操作
            setTimeout(()=>{
                //变更状态
                context.commit('mutationFunName'，value)
        })
    }
    ```

__组件内使用：__

    ```js
    this.$store.dispatch('mutationFunctionName')
    ```

## getter.js

__作用：__

1. 对状态进行二次处理。
2. 通过this.$store.getters.valueName对派生出来的状态进行访问。
3. 辅助函数mapGetters([valueName])将其映射到本地计算属性中去。
4. 需绑定到computed计算属性中

__示例：__

    ```js
    export default {
        doneTodos: state = >{
            return state.todos.filter(todo = >todo.done)
        },
        getTodoById: (state) => (id) => { 
            return state.todos.find(todo => todo.id === id) 
        }
    }
    ```

__组件内使用：__

    ```js
    doneTodosCount () { 
        return this.$store.getters.doneTodosCount 
    }
    getTodoById() { 
        return this.$store.getters.getTodoById(‘参数')
    }
    ```

## store.js

__作用：__

__示例：__

    ```js
    import Vue from 'vue'
    import Vuex from 'vuex'
    import state from '@/vuex/state'
    import getters from '@/vuex/getters'
    import mutations from '@/vuex/mutations'
    import actions from '@/vuex/actions'

    Vue.use(Vuex);

    export default new Vuex.Store({
        state,
        mutations,
        getters,
        actions,
    });
    ```

# vuex使用

## 在main.js根目录中注入store

通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。

__示例：__

    ```js
    import store from './vuex/index'
    new Vue({
        el: '#app',
        router,
        store,
        ...
    })
    ```

