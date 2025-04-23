import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { createOllama } from 'ollama-ai-provider';

// import { xai } from '@ai-sdk/xai';
// import { isTestEnvironment } from '../constants';
// import {
//   artifactModel,
//   chatModel,
//   reasoningModel,
//   titleModel,
// } from './models.test';

// export const myProvider = isTestEnvironment
//   ? customProvider({
//       languageModels: {
//         'chat-model': chatModel,
//         'chat-model-reasoning': reasoningModel,
//         'title-model': titleModel,
//         'artifact-model': artifactModel,
//       },
//     })
//   : customProvider({
//       languageModels: {
//         'chat-model': xai('grok-2-1212'),
//         'chat-model-reasoning': wrapLanguageModel({
//           model: xai('grok-3-mini-beta'),
//           middleware: extractReasoningMiddleware({ tagName: 'think' }),
//         }),
// 'title-model': xai('grok-2-1212'),
// 'artifact-model': xai('grok-2-1212'),
//       },
//       imageModels: {
//         'small-model': xai.image('grok-2-image'),
//       },
//     });

const ollama = createOllama({
  // custom settings
  baseURL: process.env.OLLAMA_BASE_URL,
});

const model = ollama('qwen2.5:0.5b', {
  simulateStreaming: true,
});

export const myProvider = customProvider({
  languageModels: {
    'chat-model': model,
    'chat-model-reasoning': wrapLanguageModel({
      model: model,
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': model,
    'artifact-model': model,
  },
});
