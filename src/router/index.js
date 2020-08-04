import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)



const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '',
    component: () => import("../components/tabber/tabber.vue"),
    redirect: "/home",
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: "平安龙泉驿"
        },

        component: () => import("../views/home/home.vue")
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import("@/views/mine/mine.vue"),
        meta: {
          title: "我的"
        },
      },
    ]
  },
  // 认证手机号码

  {
    path: '/attestation',
    name: 'attestation',
    component: () => import("@/views/home/attestation.vue")
  },

  // 认证信息填写

  {
    path: '/attprofile',
    name: 'attprofile',
    component: () => import("@/views/home/attprofile.vue")
  },
  // 修改信息
  {
    path: '/profile',
    name: 'profile',
    component: () => import("../components/mine/profile.vue")
  },
  // 帮助中心
  {
    path: '/help',
    name: 'help',
    component: () => import("../components/mine/help.vue")
  },
  // 积分兑换
  {
    path: '/point',
    name: 'point',
    component: () => import("../components/mine/point.vue")
  },
  // 提现
  {
    path: '/withdraw',
    name: 'withdraw',
    component: () => import("../components/mine/withdraw.vue")
  },
  // 提现审核
  {
    path: '/check',
    name: 'check',
    component: () => import("../components/mine/check.vue")
  },
  // 微信提现
  {
    path: '/proof',
    name: 'proof',
    component: () => import("../components/mine/proof.vue")
  },
  // 平安建设
  {
    path: '/safe',
    name: 'safe',
    meta: {
      title: "平安建设"
    },
    component: () => import("../views/safe/safe.vue")
  },
  {
    path: '/konedetail',
    name: 'konedetail',
    component: () => import("../components/knowledge/konedetail.vue")
  },
  // 在线抽奖
  {
    path: '/prize',
    component: () => import("../components/tabber/tabberprize.vue"),
    redirect: "/prize",
    children: [
      {
        path: '/prize',
        name: 'prize',
        meta: {
          title: "抽奖列表"
        },
        component: () => import("../views/prize/prize.vue")
      },
      {
        path: '/womine',
        name: 'womine',
        meta: {
          title: "我的"
        },
        component: () => import("@/views/womine/womine.vue"),
      },
    ]
  },
  // 领取奖励
  {
    path: '/recedive',
    name: 'recedive',
    meta: {
      title: "领取信息"
    },
    component: () => import("@/views/prize/recedive.vue")
  },
  {
    path: '/prizedetail',
    name: 'prizedetail',
    component: () => import("../components/prize/prizedetail.vue")
  },
  // 有奖答题
  {
    path: '/answer',
    component: () => import("../components/tabber/tabberanswer.vue"),
    redirect: "/answer",
    children: [
      {
        path: '/answer',
        name: 'answer',
        meta: {
          title: "有奖答题"
        },
        component: () => import("../views/answer/answer.vue")
      },
      {
        path: '/woanswer',
        name: 'woanswer',
        meta: {
          title: "抽奖列表"
        },
        component: () => import("@/views/woanswer/woanswer.vue"),
      },
    ]
  },
  // 完成答题
  {
    path: '/over',
    name: 'over',
    meta: {
      title: "完成答题"
    },
    component: () => import("@/views/answer/over.vue"),
  },
  // 完成答题
  {
    path: '/answerover',
    name: 'answerover',
    component: () => import("@/views/answer/answerover.vue")
  },
  // 错题解析
  {
    path: '/resolve',
    name: 'resolve',
    component: () => import("@/views/answer/resolve.vue")
  },

  // 去答题
  {
    path: '/startanswer',
    name: 'startanswer',
    component: () => import("@/views/answer/startanswer.vue")
  },
  // 查看更多
  {
    path: '/award',
    name: 'award',
    component: () => import("@/components/prize/award.vue")
  },
  // 做题
  {
    path: '/topic',
    name: 'topic',
    component: () => import("@/views/answer/topic.vue")
  },
  // 投票
  {
    path: '',
    component: () => import("../components/tabber/tabbervote.vue"),
    redirect: "/vote",
    children: [
      {
        path: '/vote',
        name: 'vote',
        meta: {
          titel: '投票'
        },
        component: () => import("../views/vote/vote.vue")
      },
      {
        path: '/votemine',
        name: 'votemine',
        component: () => import("@/views/vote/votemine.vue"),
      },
      {
        path: '/votedetail',
        name: 'votedetail',
        meta: {
          titel: '投票'
        },
        component: () => import("@/views/vote/votedetail.vue"),
      },
    ]
  },
  {
    path: '/voteproflie',
    name: 'voteproflie',
    component: () => import("@/views/vote/voteproflie.vue"),
  },
  {
    path: '/apply',
    name: 'apply',
    component: () => import("@/views/vote/apply.vue"),
  },
  // 活动报名
  {
    path: '/activity',
    name: 'activity',
    component: () => import("@/views/activity/activity.vue"),
  },
  // 活动报名详情
  {
    path: '/activitydetail',
    name: 'activitydetail',
    component: () => import("@/views/activity/activitydetail.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach(async(to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})


export default router
