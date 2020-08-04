<template>
  <div class="apply">
    <div class="apply-body">
      <div class="apply-top">青少年舞蹈才艺赛</div>
      <div class="apply-list">
        <div class="list-one">
          <span class="cszp">参赛照片</span>
          <img class="tx" src="@/assets/img/vote/tx.png" alt />
        </div>
        <div class="list-two">
          <span class="csm">参赛名</span>
          <input class="csm-input" type="text" placeholder="参赛展示的名字" />
        </div>
        <div class="list-two">
          <span class="csm">联系电话</span>
          <input class="csm-input" type="text" placeholder="请输入" />
        </div>

        <div class="list-cssp">
          <span>参赛视频</span>
          <span class="cssp-xx">（选填：最长90秒短视频）</span>
          <div class="cssp-video">
            <div class="forPreview_video" v-for="(item, index) in uploadVideoList" :key="index">
              <video :src="videoSrc" controls="controls"></video>
              <van-icon name="delete" @click="delBtn(index)" class="delte" />
            </div>
            <van-uploader
              v-show="uploadVideoList.length < 1"
              accept="video/*"
              :before-read="beforeRead"
              :after-read="afterRead"
            >
              <div class="tp-an">
                <van-button>添加视频</van-button>
              </div>
            </van-uploader>
          </div>
        </div>

        <div class="list-cstp">
          <span>参赛图片</span>
          <span class="cstp-bz">（最多四张）</span>
          <div class="cstp-tp">
            <van-uploader v-model="fileList" multiple :max-count="4" preview-size="156px">
              <div class="tp-an">
                <van-button>添加图片</van-button>
              </div>
            </van-uploader>
          </div>
        </div>
      </div>
    </div>
    <div class="apply-footer">
      <div class="list-cssm">
        <span>参赛说明</span>
        <span class="cssm-zs">（限字200）</span>

        <van-field
          v-model="message"
          type="textarea"
          maxlength="200"
          show-word-limit
          placeholder="请输入留言"
        />
      </div>
    </div>
    <div class="apply-an" @click="tjbm">
      <p>提交报名</p>
    </div>
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="wrapper-top">报名成功</div>
        <div class="wrapper-body">
          <div class="wrapper-kb"></div>
          <div class="wrapper-bj">
            <img class="wrapper-tx" src="@/assets/img/vote/tx.png" alt />
            <span>ID:123456</span>
            <span>排名：123456</span>
            <p>票数：0票</p>
          </div>
          <div class="wrapper-bz">(分享活动,让更多的小伙伴为你投票)</div>
          <div class="wrapper-an">
            <div>立即分享</div>
            <div>返回首页</div>
          </div>
        </div>
        <div class="wrapper-gb" @click="gbClick">X</div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      message: "",
      fileList: [],
      uploadVideoList: [], // 选中的上传视频列表
      videoSrc: "" // 选中的视频的src，用来显示视频
    };
  },
  created() {
    window.document.title = "参赛报名";
  },
  methods: {
    // 关闭弹窗
    gbClick() {
      this.show = false;
    },
    // 提交报名
    tjbm() {
      this.show = true;
    },
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";

      setTimeout(() => {
        file.status = "failed";
        file.message = "上传失败";
      }, 1000);
    },
    beforeRead(file) {
      console.log(file);
      let formData = new FormData(); // 为上传文件定义一个formData对象
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      let uploadUrl = URL.createObjectURL(file); // 将选中的上传文件转化为二进制文件，显示在页面上
      this.uploadVideoList.push(file);
      this.videoSrc = uploadUrl; // 这里使用foreach是为了将选中的多个文件都添加进定义的formdata变量中
      console.log(" this.videoSrc", this.videoSrc);
      this.uploadVideoList.forEach(item => {
        formData.append(item.name, item);
      });
    },
    // 删除视频
    delBtn(index) {
      if (isNaN(index) || index >= this.uploadVideoList.length) {
        return false;
      }
      let tmp = [];
      // 将没被选中的上传文件存放进一个临时数组中
      for (let i = 0; i < this.uploadVideoList.length; i++) {
        if (this.uploadVideoList[i] !== this.uploadVideoList[index]) {
          tmp.push(this.uploadVideoList[i]);
        }
      }
      // 存放当前未被选中的上传文件
      this.uploadVideoList = tmp;
    }
  }
};
</script>
<style lang="less">
.apply {
  height: 100%;
  background: rgba(238, 238, 238, 1);
  .apply-body {
    background: #fff;
    border-left: 15px solid rgba(238, 238, 238, 1);
    border-right: 15px solid rgba(238, 238, 238, 1);
    border-bottom: 20px solid rgba(238, 238, 238, 1);
    border-top: 10px solid rgba(238, 238, 238, 1);
    .apply-top {
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-top: 2px solid rgba(255, 0, 0, 1);
      border-left: 2px solid rgba(255, 0, 0, 1);
      border-right: 2px solid rgba(255, 0, 0, 1);
      background: linear-gradient(
        0deg,
        rgba(254, 72, 71, 1) 0%,
        rgba(252, 148, 64, 1) 100%
      );
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .apply-list {
      width: 100%;
      border-left: 2px solid rgba(255, 0, 0, 1);
      border-right: 2px solid rgba(255, 0, 0, 1);
      border-bottom: 2px solid rgba(255, 0, 0, 1);
      color: #26a5fe;
      font-family: PingFang SC;
      font-size: 16px;
      .list-one {
        border-bottom: 1px solid #dcdcdc;
        .cszp {
          display: inline-block;
          padding: 20px 10px 8px 10px;
        }
        .tx {
          padding: 8px 10px 0px 10px;
          width: 40px;
          height: 40px;
          float: right;
        }
      }
      .list-two {
        border-bottom: 1px solid #dcdcdc;
        .csm {
          display: inline-block;
          padding: 10px 10px 8px 10px;
        }
        .csm-input {
          padding-right: 10px;
          height: 22px;
          margin-top: 10px;
          float: right;
          border: none;
          text-align: right;
          color: #232323;
          font-size: 12px;
        }
      }
      .list-cssp {
        padding: 10px 4px 0px 10px;
        .tjsp {
          width: 100px;
          height: 100px;
          text-align: center;
          line-height: 100px;
          background: rgba(238, 238, 238, 1);
          margin-top: 10px;
          color: #888;
        }
        .cssp-xx {
          color: #888888;
          font-size: 12px;
        }
        .cssp-video {
          padding-top: 6px;
          video {
            width: 100%;
        
          }
          .tp-an {
            // width: 165px;
            // height: 165px;
            // line-height: 165px;
            text-align: center;
            .van-button {
              width: 100px;
              height: 100px;
              background: rgba(220, 220, 220, 1);
              font-size: 12px;
              color: rgba(136, 136, 136, 1);
            }
          }
        }
      }
      .list-cstp {
        padding: 10px 4px 20px 10px;
        .cstp-bz {
          color: #888888;
          font-size: 12px;
        }
        .cstp-tp {
          padding-top: 6px;
          
          .tp-an {
            // width: 165px;
            // height: 165px;
            // line-height: 165px;
            text-align: center;
            .van-button {
              width: 100px;
              height: 100px;
              background: rgba(220, 220, 220, 1);
              font-size: 12px;
              color: rgba(136, 136, 136, 1);
            }
          }
        }
      }
    }
  }
  .apply-footer {
    background: #fff;
    border-left: 15px solid rgba(238, 238, 238, 1);
    border-right: 15px solid rgba(238, 238, 238, 1);
    border-bottom: 20px solid rgba(238, 238, 238, 1);
    border-top: 10px solid rgba(238, 238, 238, 1);
    color: #26a5fe;
    font-family: PingFang SC;
    font-size: 16px;
    .list-cssm {
      padding: 15px 4px 8px 10px;
      border: 2px solid rgba(255, 0, 0, 1);
      .cssm-zs {
        color: #888888;
        font-size: 12px;
      }
      .van-cell {
        padding-left: 0px;
      }
      textarea {
        padding-left: 10px;
        width: 100%;
        height: 100px !important;
        background: rgba(238, 238, 238, 1);
        border: none;
        font-size: 12px;
      }
    }
  }
  .apply-an {
    text-align: center;
    padding-bottom: 20px;
    padding-top: 10px;
    p {
      margin: auto;
      font-size: 20px;
      border-radius: 5px;
      width: 80%;
      height: 50px;
      line-height: 50px;
      color: #ffffff;
      background: linear-gradient(
        90deg,
        rgba(252, 148, 64, 1) 0%,
        rgba(254, 72, 71, 1) 100%
      );
      color: #fff;
    }
  }
  .wrapper {
    margin-top: 100px !important;

    width: 74%;
    margin: auto;
    .wrapper-top {
      background-color: #f5b52c;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
    }
    .wrapper-body {
      width: 100%;
      background: #fff;
      .wrapper-kb {
        height: 20px;
      }
      .wrapper-bj {
        margin: auto;
        width: 80%;
        height: 140px;
        background: #fff4cc;
        margin-bottom: 20px;
        .wrapper-tx {
          display: block;
          width: 40px;
          height: 40px;
          padding-top: 10px;
          margin: auto;
          padding-bottom: 10px;
        }
        span,
        p {
          padding: 0px 6%;
        }
      }
      .wrapper-bz {
        text-align: center;
        font-size: 12px;
        color: #888;
      }
      .wrapper-an {
        padding-top: 40px;
        width: 80%;
        display: flex;
        margin: auto;
        justify-content: space-between;
        font-size: 12px;
        color: #fff;
        padding-bottom: 20px;
        div {
          background: #f5b52c;
          width: 90px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 50px;
        }
      }
    }
    .wrapper-gb {
      margin: auto;
      margin-top: 30px;
      color: #f5f5f5;
      border: 2px solid #f5f5f5;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
    }
  }
}
</style>