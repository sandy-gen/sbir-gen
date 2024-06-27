import * as fs from 'fs';
import * as path from 'path';
import PptxGenJS from 'pptxgenjs';
import { Config, UserInputData } from '../Interface';



function loadConfig(configPath: string): Config {
  const configData = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(configData);
}

function replaceText(replacements: { [key: string]: string }, text: string): string {
  let replacedText = text;
  for (const placeholder in replacements) {
    replacedText = replacedText.replace(new RegExp(placeholder, 'g'), replacements[placeholder]);
  }
  return replacedText;
}

async function addImageToSlide(slide: PptxGenJS.Slide, imageInfo: { url: string; left: number; top: number; width: number }) {
  const response = await fetch(imageInfo.url);
  const buffer = await response.arrayBuffer();
  const base64String = Buffer.from(new Uint8Array(buffer)).toString('base64');
  const base64Image = `data:image/png;base64,${base64String}`;

  slide.addImage({
    data: base64Image,
    x: imageInfo.left,
    y: imageInfo.top,
    w: imageInfo.width,
  });
}

export async function generateDeck(inputData: UserInputData, configPath: string) {
  const config = loadConfig(configPath);
  const replacementsConfig = config.replacements;

  const replacements: { [key: string]: string } = {};
  for (const slideKey in replacementsConfig) {
    const slideConfig = replacementsConfig[slideKey];
    for (const placeholder in slideConfig.fields) {
      const field = slideConfig.fields[placeholder];
      if (inputData[field]) {
        replacements[placeholder] = inputData[field];
      }
    }
  }

  const pptx = new PptxGenJS();
  pptx.addSection({ title: 'Presentation Slides' });

  for (let i = 0; i < 10; i++) {
    const slide = pptx.addSlide({ sectionTitle: 'Presentation Slides' });
    const slideKey = `slide${i + 1}`;

    if (slideKey in replacementsConfig) {
      const slideConfig = replacementsConfig[slideKey];
      for (const placeholder in slideConfig.fields) {
        const text = replaceText(replacements, placeholder);
        slide.addText(text, { x: 0.5, y: 0.5, w: '90%', h: 1.5, fontSize: 18 });
      }
    }

    if(!config.images) continue;

    if (slideKey in config.images) {
      for (const imageInfo of config.images[slideKey]) {
        await addImageToSlide(slide, imageInfo);
      }
    }
  }

  const outputPath = path.join(__dirname, 'generated_presentation.pptx');
  pptx.writeFile({ fileName: 'generated_presentation.pptx' }).then(() => {
    console.log(`Presentation saved to ${outputPath}`);
  });
}


