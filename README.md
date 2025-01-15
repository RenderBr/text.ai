# [text.ai](https://textai.rageave.xyz/)

Welcome to **text.ai**, an AI-powered text messaging platform! Using text.ai, you can create custom AI chat personas to respond to text messages in a human-like manner. **This was built in a day, as a hobby project.**

**Text.AI** is now live, for free! Click [here](https://textai.rageave.xyz/) to visit the site. Please keep in mind, the image model has been degraded and it is running on slower generation hardware than our testing environment. Responses and image generation may be slow. Image generation is seemingly broken in production :(

---

## Features

- **Create Custom AI Contacts**: Personalize your AI contacts by giving them a name and defining their characteristics. The more detailed you are, the better their responses will be.
- **Powered by LLama 3.1 Lexi**: text.ai leverages the LLM model [LLama 3.1 Lexi](https://huggingface.co/Orenguteng/Llama-3.1-8B-Lexi-Uncensored-V2-GGUF) to deliver human-like responses.
- **Unique Contact Images**: Generate contact images using the [PerfectDeliberate Anime](https://civitai.com/models/111274/perfectdeliberate-anime) model. The AI generates images based on the characteristics you provide, ensuring a personalized touch.
- **User Privacy**: All images are visible only to you.

---

## Getting Started

### How to Use text.ai

You can't yet. Unless you wanna figure it out yourself locally.

---

## Screenshots

### Contacts Page
![Contacts Page](https://github.com/user-attachments/assets/91a6e801-f18f-4791-87f3-5d8dbe4b1353)

### Chat Example
![Chat Example](https://github.com/user-attachments/assets/c7af6398-babc-48f9-8901-cbf78298ebf7)

---

## Technology

- **Programming Language**: [Typescript](https://www.typescriptlang.org/)
  - **Runtime**: [Node.js](https://nodejs.org/en)
- **AI Models**:
  - [LLama 3.1 Lexi](https://huggingface.co/Orenguteng/Llama-3.1-8B-Lexi-Uncensored-V2-GGUF) for text generation.
  - [PerfectDeliberate Anime](https://civitai.com/models/111274/perfectdeliberate-anime) for contact image generation.
- **Full-stack web Framework**: [Next.js](https://nextjs.org/), a [React.js framework](https://react.dev/)
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/).
  - **ODM**: [Mongoose](https://mongoosejs.com/)
- **Local LLM API**: [LM Studio](https://lmstudio.ai/)
- **Local Stable Diffusion Web API**: [AUTOMATIC1111's SD WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
- **Authentication**: handled via [bcrypt](https://www.npmjs.com/package/bcrypt) and [JWTs](https://jwt.io/)
- **Developer**: Built by [Average](https://github.com/RenderBr/) (a.k.a. `@rageave` on Discord).

---

## Developer Notes

Installation instructions may be added in the future. For now, please enjoy the code.

- **Discord**: `@rageave`
- **GitHub**: [Average](https://github.com/RenderBr/)

---
