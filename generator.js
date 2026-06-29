// Canvas Meme Generator Logic

let currentImage = null;
let currentTemplateId = "drake";

function initMemeGenerator() {
  const canvas = document.getElementById("meme-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const templateSelect = document.getElementById("template-select");
  const fileInput = document.getElementById("meme-upload");
  const topTextInput = document.getElementById("top-text");
  const bottomTextInput = document.getElementById("bottom-text");
  const fontSizeInput = document.getElementById("font-size");
  const fontSizeValue = document.getElementById("font-size-val");
  const textColorInput = document.getElementById("text-color");
  const strokeColorInput = document.getElementById("stroke-color");
  const downloadBtn = document.getElementById("download-meme-btn");

  // Load initial template
  loadTemplate(currentTemplateId);

  // Event Listeners
  if (templateSelect) {
    templateSelect.addEventListener("change", (e) => {
      currentTemplateId = e.target.value;
      if (currentTemplateId !== "custom") {
        loadTemplate(currentTemplateId);
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            currentImage = img;
            if (templateSelect) templateSelect.value = "custom";
            drawMeme();
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const inputsToRedraw = [topTextInput, bottomTextInput, fontSizeInput, textColorInput, strokeColorInput];
  inputsToRedraw.forEach(input => {
    if (input) {
      input.addEventListener("input", () => {
        if (input === fontSizeInput && fontSizeValue) {
          fontSizeValue.textContent = fontSizeInput.value + "px";
        }
        drawMeme();
      });
    }
  });

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      if (!canvas) return;
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `meme-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    });
  }

  function loadTemplate(templateId) {
    const template = window.memeTemplates.find(t => t.id === templateId);
    if (template) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        currentImage = img;
        // Populate inputs with defaults if empty
        if (topTextInput && (topTextInput.value === "" || topTextInput.value === topTextInput.defaultValue)) {
          topTextInput.value = template.defaultText[0] || "";
        }
        if (bottomTextInput && (bottomTextInput.value === "" || bottomTextInput.value === bottomTextInput.defaultValue)) {
          bottomTextInput.value = template.defaultText[1] || "";
        }
        drawMeme();
      };
      img.src = template.url;
    }
  }

  function drawMeme() {
    if (!currentImage || !canvas || !ctx) return;

    // Standardize canvas dimensions while keeping aspect ratio
    const maxWidth = 550;
    const scale = Math.min(maxWidth / currentImage.width, 1);
    canvas.width = currentImage.width * scale;
    canvas.height = currentImage.height * scale;

    // Draw the background meme image
    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

    // Apply text styling
    const fontSize = parseInt(fontSizeInput ? fontSizeInput.value : 32);
    const textColor = textColorInput ? textColorInput.value : "#ffffff";
    const strokeColor = strokeColorInput ? strokeColorInput.value : "#000000";

    ctx.fillStyle = textColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(3, fontSize / 10);
    ctx.textAlign = "center";
    ctx.lineJoin = "miter";
    ctx.miterLimit = 2;

    // Text fonts - Space Grotesque/Impact styled
    ctx.font = `bold ${fontSize}px sans-serif`;

    const topText = topTextInput ? topTextInput.value.toUpperCase() : "";
    const bottomText = bottomTextInput ? bottomTextInput.value.toUpperCase() : "";

    // Draw Top Text
    if (topText) {
      ctx.textBaseline = "top";
      wrapText(ctx, topText, canvas.width / 2, 20, canvas.width - 40, fontSize * 1.2, false);
    }

    // Draw Bottom Text
    if (bottomText) {
      ctx.textBaseline = "bottom";
      wrapText(ctx, bottomText, canvas.width / 2, canvas.height - 20, canvas.width - 40, fontSize * 1.2, true);
    }
  }

  // Wrap text supporting bottom-up drawing for bottom text
  function wrapText(ctx, text, x, y, maxWidth, lineHeight, isBottom) {
    const words = text.split(" ");
    let lines = [];
    let currentLine = words[0] || "";

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);

    if (isBottom) {
      for (let i = lines.length - 1; i >= 0; i--) {
        const lineY = y - (lines.length - 1 - i) * lineHeight;
        ctx.strokeText(lines[i], x, lineY);
        ctx.fillText(lines[i], x, lineY);
      }
    } else {
      for (let i = 0; i < lines.length; i++) {
        const lineY = y + i * lineHeight;
        ctx.strokeText(lines[i], x, lineY);
        ctx.fillText(lines[i], x, lineY);
      }
    }
  }
}

window.initMemeGenerator = initMemeGenerator;
