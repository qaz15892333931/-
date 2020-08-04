<template>
  <div class="attprofile">
    <van-form>
      <van-field
        v-model="userName"
        label="姓名"
        placeholder="请输入姓名"
        :rules="[{  required: true, message: '请填写姓名' }]"
      />
      <van-field name="radio" label="性别" class="sex">
        <template #input>
          <van-radio-group direction="horizontal" v-model="sex">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        label="身份证号"
        placeholder="请输入身份证号"
        readonly
        clickable
        :value="userIdCard"
        @touchstart.native.stop="showNumber = true"
        :rules="[{pattern, message: '请输入身份证号',trigger :'onChange' }]"
      />
      <van-number-keyboard
        v-model="userIdCard"
        extra-key="X"
        close-button-text="完成"
        :maxlength="18"
        :show="showNumber"
        @blur="showNumber=false"
      />

      <van-field
        readonly
        clickable
        name="area"
        :value="value"
        label="省市区选择"
        placeholder="点击选择省市区"
        @click="showArea = false"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :value="areaValue"
          :columns-num="3"
          :area-list="areaList"
          @change="onChange"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
      <!--自带 -->
      <!-- <van-field readonly clickable name="area" value="areaValue" label="省市区选择" placeholder="点击选择省市区"></van-field> -->
      <!--省市区三级联动 -->
      <!-- <div class="divwrap" v-if="showArea">
        <v-distpicker
          type="mobile"
          @province="onChangeProvince"
          @city="onChangeCity"
          @area="onChangeArea"
        ></v-distpicker>
      </div>-->
      <!-- 遮罩层 -->
      <!-- <div class="blacks" v-if="showArea" @click="countermand"></div> -->

      <van-field
        readonly
        clickable
        name="street"
        :value="streetValue"
        label="街道地址"
        placeholder="点击选择街道地址"
        @click="showStreets"
        :rules="[{  required: true, message: '请选择街道地址' }]"
      ></van-field>
      <van-popup v-model="showStreet" position="bottom">
        <van-picker
          show-toolbar
          :columns="streetList"
          @confirm="onConfirmStreet"
          @cancel="showStreet = false"
        />
      </van-popup>
      <van-field
        @click="showCommunity = true"
        v-model="communityValue"
        label="村社区"
        placeholder="请输入村社区"
        :rules="[{  required: true, message: '请选择村社区' }]"
      />
      <van-popup v-model="showCommunity" position="bottom">
        <van-search
          autofocus="true"
          @search="onSearch"
          placeholder="请输入搜索关键词"
          v-model="communityValue"
        />
        <van-picker
          show-toolbar
          :columns="Community"
          @confirm="onConfirmCommunity"
          @cancel="showCommunity = false"
        />
      </van-popup>

      <van-field
        @click="showPlot = true"
        v-model="plotValue"
        label="小区"
        placeholder="请输入小区"
        :rules="[{  required: true, message: '请选择小区' }]"
      />
      <van-popup v-model="showPlot" position="bottom">
        <van-search
          autofocus="true"
          v-model="plotValue"
          @search="searchPlot"
          placeholder="请输入搜索关键词"
        />

        <van-picker
          show-toolbar
          :columns="Plot"
          @confirm="onConfirmPlot"
          @cancel="showPlot = false"
        />
      </van-popup>

      <van-field label="详细地址" v-model="detailedAddress" type="textarea" placeholder="请输入详细地址" />
      <van-field
        readonly
        clickable
        name="picker"
        :value="politicsStatus"
        label="政治面貌"
        placeholder="点击选择政治面貌"
        @click="showPolit = true"
      />
      <van-popup v-model="showPolit" position="bottom">
        <van-picker
          show-toolbar
          :columns="politics"
          @confirm="onConfirmPolitics"
          @cancel="showPolit = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="standardOfCulture"
        label="文化程度"
        placeholder="点击选择文化程度"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="culture"
          @confirm="onConfirmCulture"
          @cancel="showPicker = false"
        />
      </van-popup>
      <div style="margin: 48px;">
        <van-button block @click="onSubmit">保存</van-button>
      </div>
    </van-form>
    <van-overlay v-show="spinnerShow">
      <van-loading type="spinner" />
    </van-overlay>

    <van-overlay :show="show">
      <div class="wrapper">
        <div class="wrapper-top">您已认证成功</div>
        <div class="wrapper-an" @click="rzClick">首页</div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import {
  areaLists,
  streetLists,
  communityList,
  plotList,
  authentification,
} from "@/http/home/home";
import VDistpicker from "v-distpicker";
import { listData } from "@/api/dict";
export default {
  components: { VDistpicker },

  data() {
    return {
      userIdCard: "",
      userName: "",
      show: false,
      sex: "",
      detailedAddress: "",
      value: "四川省/成都市/龙泉驿区",
      showArea: false,
      //省市区
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {},
      },
      areaValue: "510112",
      provinceCode: "",
      countyCode: "",
      cityCode: "",

      streetList: [],
      streetValue: "",
      streetId: "",
      showStreet: false,
      community: "",
      plot: "",
      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      // 社区
      showCommunity: false,
      Community: [],
      communityValue: "",
      communityId: "",
      // 小区
      showPlot: false,
      Plot: [],
      plotValue: "",
      plotId: "",
      // 文化程度
      culture: [],
      standardOfCulture: "",
      cultureId: "",
      showPicker: false,
      // 政治面貌
      politics: [],
      politicsStatus: "",
      PoliticsId: "",
      showPolit: false,
      spinnerShow: false,
      showNumber: false,
      mineInfo: {},
    };
  },

  created() {
    this.province();
    if (localStorage.getItem("sex") != "null") {
      this.sex = localStorage.getItem("sex");
    } else {
      this.sex = "1";
    }
    // 文化程度
    listData("sys_standard_of_culture").then((res) => {
      console.log("文化程度", res);
      for (let i of res.data) {
        this.culture.push({ keyId: i.dictCode, text: i.dictLabel });
      }
      console.log("文化程度", this.culture);
    });
    // 政治面貌
    listData("sys_politics_status").then((res) => {
      console.log("政治面貌", res);
      for (let i of res.data) {
        this.politics.push({ keyId: i.dictCode, text: i.dictLabel });
      }
      console.log("政治面貌", this.politics);
    });
  },
  mounted() {
    if (this.$route.query.mineInfo) {
      this.mineInfo = this.$route.query.mineInfo;
      console.log("  this.mineInfo", this.mineInfo);
      this.userName = this.mineInfo.nickName;
      this.sex = this.mineInfo.sex;
      this.userIdCard = this.mineInfo.userIdCard;
      // this.showStreet = this.mineInfo.townCode;
      this.detailedAddress = this.mineInfo.detailedAddress;
      this.showPicker = this.mineInfo.standardOfCulture;
      this.showPolit = this.mineInfo.politicsStatus;
    }
  },
  methods: {
    // 社区模糊查询
    onSearch(value) {
      console.log("查询关键字", value);
      communityList({ name: value }).then((res) => {
        console.log(res);
        for (let i of res.rows) {
          this.Community.push({ keyId: i.agencyCode, text: i.villageName });
        }
      });
    },
    // 小区模糊查询
    searchPlot(value) {
      console.log("查询关键字", value);
      plotList({ name: value }).then((res) => {
        console.log("小区模糊查询", res);
        for (let i of res.rows) {
          this.Plot.push({ keyId: i.id, text: i.villageName });
        }
      });
    },
    // 选中省市区
    onChange(value, index) {
      console.log("index", index);
      this.provinceCode = index[0].code;
      console.log("选中的省", this.provinceCode);
      if (this.provinceCode) {
        this.city();
      }
      if (index[1] != undefined) {
        this.cityCode = index[1].code;
        this.county();
      }
    },

    // 省
    province() {
      areaLists({ parentid: 1 }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          for (let i in res.data) {
            this.areaList.province_list[res.data[i].id] = res.data[i].areaname;
          }
        }

        console.log(" 省", this.areaList.province_list);
      });
    },
    // 市
    city() {
      console.log("省编码", this.provinceCode);
      areaLists({ parentid: this.provinceCode }).then((res) => {
        console.log("市", res);
        if (res.code == 200) {
          for (let i in res.data) {
            this.areaList.city_list[res.data[i].id] = res.data[i].areaname;
          }
          console.log(" 省市", this.areaList);
        }
      });
    },
    // 县
    county() {
      console.log("市编码", this.cityCode);
      areaLists({ parentid: this.cityCode }).then((res) => {
        console.log(res);
        for (let i in res.data) {
          this.areaList.county_list[res.data[i].id] = res.data[i].areaname;
        }
        console.log(" this.areaList.county_list", this.areaList.county_list);
      });
      console.log(" 省市县", this.areaList);
    },
    // 街道
    showStreets() {
      this.showStreet = true;
      console.log("县", this.countyCode);
      streetLists({ areaId: 510112 }).then((res) => {
        console.log(res);
        for (let i of res.data) {
          this.streetList.push({ keyId: i.townCode, text: i.townsName });
        }
      });
    },
    onConfirmStreet(value) {
      console.log(value);
      this.streetValue = value.text;
      this.streetId = value.keyId;
      this.showStreet = false;
    },
    // 文化程度确定
    onConfirmCulture(value) {
      console.log("文化程度", value);
      this.standardOfCulture = value.text;
      this.cultureId = value.keyId;
      this.showPicker = false;
    },
    // 政治面貌确定
    onConfirmPolitics(value) {
      this.politicsStatus = value.text;
      this.PoliticsId = value.keyId;
      this.showPolit = false;
    },
    // 社区
    onConfirmCommunity(value) {
      this.communityValue = value.text;
      this.communityId = value.keyId;
      this.showCommunity = false;
    },
    // 小区确定
    onConfirmPlot(value) {
      this.plotValue = value.text;
      this.plotId = value.keyId;
      this.showPlot = false;
    },
    countermand() {
      this.showProvince = false;
    },
    // 省市区拼接
    onConfirm(values) {
      console.log(" 省市区", values);
      this.countyCode = values[2].code;
      this.value = values.map((item) => item.name).join("/");
      this.showArea = false;
      this.streetValue = "";
      this.streetList = [];
    },

    // 提交
    onSubmit() {
      this.spinnerShow = true;
      let data = {
        // cityCode: this.cityCode,
        cityCode: 510100,
        communityCode: this.plotId,
        // countyCode: this.countyCode,
        countyCode: 510112,
        detailedAddress: this.detailedAddress,
        openId: localStorage.getItem("openId"),
        phone: localStorage.getItem("phone"),
        politicsStatus: this.PoliticsId,
        // provinceCode: this.provinceCode,
        provinceCode: 510000,
        sex: this.sex,
        smsCode: localStorage.getItem("smsCode"),
        standardOfCulture: this.cultureId,
        townCode: this.streetId,
        userIdCard: this.userIdCard,
        userName: this.userName,
        villageCode: this.communityId,
      };
      console.log(data);
      authentification(data).then((res) => {
        console.log("认证结果", res);
        if (res.code == 200) {
          this.$store.state.token = res.msg;
          this.show = true;
        } else {
          alert(res.msg);
        }
        this.spinnerShow = false;
      });
    },
    // 认证成功
    rzClick() {
      this.$router.push("/home");
    },
  },
};
</script>
<style lang="less"  >
.attprofile {
  .sex {
    .van-field__label {
      margin-right: 39%;
    }
  }
  .van-field__control,
  .van-field__error-message {
    text-align: right !important;
  }
  /*遮罩层*/
  .blacks {
    position: fixed;
    width: 100%;
    height: 30%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.45);
  }
  /*省市区三级联动*/
  // .divwrap {
  //   height: 62%;
  //   position: fixed;
  //   left: 0;
  //   bottom: 0;
  //   width: 100%;
  //   z-index: 99;
  // }

  /*外部*/
  // .divwrap .distpicker-address-wrapper {
  //   color: #0d0d0d;
  //   height: 100%;
  // }

  /*头部*/
  // .divwrap .address-header {
  //   background: #fff;
  //   color: #000;
  //   width: 100%;
  //   position: fixed;
  //   bottom: 68vh;
  //   height: 0.2rem;
  //   // font-size: 0.3rem;
  // }

  /*头部内容*/
  // .divwrap .address-header ul li {
  //   background: #fff;
  //   flex-grow: 1;
  //   text-align: center;
  // }

  /*选择过省市区的头部*/
  // .divwrap .address-header .active {
  //   color: #000;
  //   border-bottom: 0.05rem solid #666;
  // }

  /*内容部分*/
  // .divwrap .address-container {
  //   overflow: scroll;
  //   height: 100%;
  // }

  /*点过的地区内容*/
  // .divwrap .address-container .active {
  //   color: rgb(196, 65, 65);
  // }

  .van-button {
    color: #fff;
    border-radius: 4px;
    background: linear-gradient(90deg, #fc9440 0%, #fe4746 100%);
    font-weight: 500;
    letter-spacing: 2px;
    font-size: 18px;
  }
  .wrapper {
    margin-top: 180px !important;
    width: 76%;
    margin: 0 auto;
    .wrapper-top {
      width: 100%;
      height: 100px;
      background: #fff;
      line-height: 100px;
      text-align: center;
      color: #fe4847;
      letter-spacing: 2px;
      font-size: 18px;
    }
    .wrapper-an {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: linear-gradient(180deg, #fc9440 0%, #fe4746 100%);
      color: #fff;
    }
  }
  .van-loading {
    margin-top: 50%;
    margin-left: 50%;
  }
}
</style>