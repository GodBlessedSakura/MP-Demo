export default [
    { exact: true, path: '/', redirect:'/order' },

    {exact: true, path:'/order' ,component:'./Order', routes:[
      {path:'/order/instruct',component:'./Order/Main/$index.tsx', routes:[
        {path:'/order/instruct',exact:true,component:'./Order/Main/default.tsx'},
        {path:'/order/instruct/recommend',component:'./Order/Main/Functions/Recommend'},
        {path:'/order/instruct/dislike',component:'./Order/Main/Functions/Dislike'},
        {path:'/order/instruct/history',component:'./Order/Main/Functions/History'},
        {path:'/order/instruct/give',component:'./Order/Main/Functions/Give'},
        {path:'/order/instruct/receive',component:'./Order/Main/Functions/Receive'},
        {path:'/order/instruct/menu',component:'./Order/Main/Functions/Menu'},
        {path:'/order/instruct/danmaku',component:'./Order/Main/Functions/Danmaku'},
      ]},
      {
        path:'/order/history',component:'./Order/History'
      },
      {
        path:'/order/danmaku',component:'./Order/Danmaku'
      },
    ]},
    { path: '/login', component: './Login' },
    { path: '/signup', component: './SignUp' },

  ]