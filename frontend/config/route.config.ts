export default [
    { exact: true, path: '/', redirect:'/order' },

    {exact: true, path:'/order' ,component:'./Order', routes:[
      // {path:'/chat', exact:true,component:'./Chat/Main/default.tsx'},
      {path:'/order/instruct',component:'./Order/Main/$index.tsx'}
    ]},
    { path: '/login', component: './Login' },
    { path: '/signup', component: './SignUp' },

  ]