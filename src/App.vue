<template>
  <div class="signature-container">
    <div class="signature-action">
      <el-button type="primary" @click="methods.exportSignature">导出图片</el-button>

      <el-input v-model="textRef" placeholder="placeholder" style="width: 180px;margin: 0 12px;"></el-input>
      <el-button type="primary" @click="methods.intTextCanvas">更新文本</el-button>
    </div>
    <div class="signature-warp-area">
      <canvas id="textCanvas" class="canvas-layer"></canvas>
      <canvas id="signatureCanvas" class="canvas-layer signature-pad"></canvas>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import SmoothSignature from './smooth-signature'
const textRef = ref('张三丰')
const fontSize = ref(32)
const signature = ref()

const methods = {
  int: () => {
    const canvas = document.getElementById("signatureCanvas");
    const options = {
      width: 800,
      height: 400,
      minWidth: 4,
      maxWidth: 12,
      // color: '#1890ff',
      // bgColor: '#f6f6f6'
    };
    signature.value = new SmoothSignature(canvas, options);
  },
  intTextCanvas:()=>{
    // 获取DOM元素
    const textCanvas = document.getElementById('textCanvas');
    const textCtx = textCanvas.getContext('2d');

    // 绘制文本
    drawText()

    // 绘制文本
    function drawText() {
      // 清除Canvas
      textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);

      // 获取当前设置值
      const text = textRef.value;
      const size = 50;
      const weight = 'normal';
      const style = 'normal';
      const family = '微软雅黑';
      const align = 'center';
      const styleType = 'dashed';
      const strokeSize = 1;
      const dashSize = 1;
      const fillColor = '#333333';
      const stroke = '#ebedef';

      // 设置字体
      textCtx.font = `${style} ${weight} ${size}px "${family}", sans-serif`;

      console.log('textCtx.font = ',textCtx.font);

      // 设置文本对齐
      textCtx.textAlign = align;
      textCtx.textBaseline = 'middle';

      // 计算文本位置
      let x = textCanvas.width / 2; // 默认居中
      if (align === 'left') x = 40;
      if (align === 'right') x = textCanvas.width - 40;

      const y = textCanvas.height / 2;

      // 根据选择的样式绘制文本
      switch(styleType) {
        case 'fill':
          // 填充文本
          textCtx.fillStyle = fillColor;
          textCtx.fillText(text, x, y);
          break;

        case 'stroke':
          // 描边文本
          textCtx.strokeStyle = stroke;
          textCtx.lineWidth = strokeSize;
          textCtx.strokeText(text, x, y);
          break;

        case 'fill-stroke':
          // 填充+描边文本
          textCtx.fillStyle = fillColor;
          textCtx.fillText(text, x, y);

          textCtx.strokeStyle = stroke;
          textCtx.lineWidth = strokeSize;
          textCtx.strokeText(text, x, y);
          break;

        case 'dashed':
          // 虚线描边文本
          textCtx.strokeStyle = stroke;
          textCtx.lineWidth = strokeSize;

          // 设置虚线样式
          textCtx.setLineDash([dashSize, dashSize]);

          // 绘制文本路径
          textCtx.strokeText(text, x, y);

          // 重置虚线样式
          textCtx.setLineDash([]);
          break;
      }

      // 更新组合预览
      // updateExportPreviews();
    }
  },
  exportSignature:()=>{
    if (signature.value.isEmpty()){
      alert('请签名后再导出');
      return;
    }
    // 创建下载链接
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = signature.value.toDataURL()
    link.click();
  }
}
onMounted(() => {
  methods.int();
  methods.intTextCanvas();
})
</script>

