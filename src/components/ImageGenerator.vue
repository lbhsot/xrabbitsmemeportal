<template>
  <div class="container">
    <div class="preview-wrapper" ref="previewNode" v-loading="imageLoading" v-show="generating">
      <img :src="rabbitImageUrl" alt="" @load="imageLoaded"/>
      <Laser
        :style="{left: '29%', top: '43%', filter: 'blur(1px)' }"
        :colors="[leftLaserColor1, leftLaserColor2]"
        v-if="leftLaserVisible"
      />
      <Laser
        :style="{left: '55%', top: '44%', filter: 'blur(1px)' }"
        :colors="[rightLaserColor1, rightLaserColor2]"
        v-if="rightLaserVisible"
      />
    </div>
    <div class="tools-wrapper" v-show="generating">
      <div class="form-label">请输入您想获取的兔子编号</div>
      <el-input v-model="rabbitNo" placeholder="从 0 开始，最大编号为 7501" />
      <el-button
        type="primary"
        class="add-btn"
        :disabled="imageLoading"
        @click="leftLaserVisible = !leftLaserVisible"
      >
        {{ leftLaserVisible ? '去掉左眼镭射眼' : '添加左眼镭射眼' }}
      </el-button>
      <div class="form-label">左眼镭射眼颜色</div>
      <div class="color-picker-wrapper">
        <el-color-picker v-model="leftLaserColor1"/>
        <el-color-picker v-model="leftLaserColor2"/>
      </div>
      <el-button
        type="primary"
        class="add-btn"
        :disabled="imageLoading"
        @click="rightLaserVisible = !rightLaserVisible"
      >
        {{ rightLaserVisible ? '去掉右眼镭射眼' : '添加右眼镭射眼' }}
      </el-button>
      <div class="form-label">右眼镭射眼颜色</div>
      <div class="color-picker-wrapper">
        <el-color-picker v-model="rightLaserColor1"/>
        <el-color-picker v-model="rightLaserColor2"/>
      </div>
      <el-button type="primary" class="add-btn" :disabled="imageLoading" @click="generateImage">
        生成图片
      </el-button>
    </div>
    <div v-show="!generating" class="result-wrapper">
      <img class="preview-image" ref="previewImage" alt=""/>
      <el-button type="primary" @click="generating = true">
        再做一张!
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import domtoimage from 'dom-to-image';
import {
  defineComponent, onMounted,
  ref,
  watch,
} from 'vue';
import Laser from '@/components/effects/laser.vue';
import XRC_CONFIG from '@/constants/xrc';
import { ElLoading } from 'element-plus';
import api from '@/api';

export default defineComponent({
  components: { Laser },

  setup() {
    const previewNode = ref<HTMLDivElement|null>(null);
    const previewImage = ref<HTMLImageElement|null>(null);
    const rabbitNo = ref<string>('');
    const leftLaserVisible = ref<boolean>(false);
    const leftLaserColor1 = ref<string>('#fff');
    const leftLaserColor2 = ref<string>('#F90C20');
    const rightLaserVisible = ref<boolean>(false);
    const rightLaserColor1 = ref<string>('#fff');
    const rightLaserColor2 = ref<string>('#F90C20');
    const rabbitImageUrl = ref<string>('');
    const imageLoading = ref<boolean>(true);
    const generating = ref<boolean>(true);
    const loadingInstance = ref<any>(null);
    const fetchNFTUrl = async (no: number) => {
      const resp: any = await api.get(`/series/${XRC_CONFIG.IPFS_PATH}/nfts/${no}`);
      return resp.image_url;
    };
    watch(rabbitNo, async (newNo, oldNo) => {
      if (newNo === oldNo) return;
      try {
        const currentNo = parseInt(newNo, 10);
        if (currentNo >= 0 && currentNo < XRC_CONFIG.TOTAL_SUPPLY) {
          imageLoading.value = true;
          let imageUrl = '';
          try {
            imageUrl = await fetchNFTUrl(currentNo);
          } catch (e) {
            imageUrl = '';
          }
          rabbitImageUrl.value = imageUrl || `${XRC_CONFIG.IMAGE_BASE_URL}${newNo}.png`;
        }
        // eslint-disable-next-line no-empty
      } catch (e) {}
    });
    onMounted(() => {
      rabbitNo.value = '0';
    });
    const imageLoaded = () => {
      imageLoading.value = false;
    };
    const generateImage = () => {
      if (previewNode.value) {
        loadingInstance.value = ElLoading.service({});
        domtoimage.toPng(previewNode.value, {
          width: previewNode.value.clientWidth,
          height: previewNode.value.clientHeight,
        }).then((dataUrl) => {
          if (previewImage.value) {
            previewImage.value.src = dataUrl;
            generating.value = false;
            if (loadingInstance.value) {
              loadingInstance.value.close();
            }
          }
        }).catch((e) => {
          if (loadingInstance.value) {
            loadingInstance.value.close();
          }
        });
      }
    };
    return {
      previewNode,
      previewImage,
      rabbitNo,
      leftLaserVisible,
      rightLaserVisible,
      rabbitImageUrl,
      imageLoading,
      imageLoaded,
      generating,
      generateImage,
      leftLaserColor1,
      leftLaserColor2,
      rightLaserColor1,
      rightLaserColor2,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .preview-wrapper {
    width: 759px;
    height: 759px;
    display: flex;
    overflow: hidden;
    position: relative;
    border: none;
    /deep/.el-card__body {
      width: 759px;
      height: 759px;
      display: flex;
      overflow: hidden;
      position: relative;
      padding: 0;
    }
  }
  .tools-wrapper {
    display: flex;
    margin-left: 30px;
    flex-direction: column;
    align-items: flex-start;
    .form-label {
      margin-top: 15px;
      margin-bottom: 15px;
      color: white;
    }
    .add-btn {
      margin-top: 15px;
      width: 100%;
    }
    .add-btn + .add-btn {
      margin-left: 0;
    }
    .color-picker-wrapper {
      display: flex;
      flex-direction: row;
      /deep/ .el-color-picker + .el-color-picker {
        margin-left: 15px;
      }
    }
  }
  .result-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .preview-image {
      margin-bottom: 30px;
    }
  }
}
</style>
