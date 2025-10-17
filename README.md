# Cido Frontend

A modern web application for designers and creative professionals to showcase their work, connect with others, and grow their professional network.

## Features

- **Project Showcase**: Display and browse design projects with detailed information
- **Designer Profiles**: View and connect with professional designers
- **Community Section**: Interactive space for designers to share and discuss
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Modern UI**: Clean and intuitive user interface with smooth animations

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **UI Libraries**: Material-UI, Semantic UI React
- **Design Integration**: Figma API
- **Styling**: CSS Modules, CSS Variables
- **HTTP Client**: Axios

## Project Structure

```
src/
├── components/         # React components
│   ├── NavigationBar   # Main navigation
│   ├── ProjectCards    # Project showcase cards
│   ├── InterviewCards  # Interview section cards
│   └── CommunityCards  # Community section cards
├── styles/            # CSS modules
└── pages/            # Page components
```

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## 🎨 Figma Integration

This project supports automatic design token extraction from Figma files.

### Quick Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Figma credentials to `.env.local`:
   ```env
   FIGMA_ACCESS_TOKEN=your_token_here
   FIGMA_FILE_KEY=your_file_key_here
   ```

3. Fetch design tokens from Figma:
   ```bash
   npm run figma:fetch
   ```

📖 **For detailed setup instructions, see [FIGMA_SETUP.md](./FIGMA_SETUP.md)**

### Available Figma Commands

- `npm run figma:fetch` - Fetch design tokens from Figma once
- `npm run figma:watch` - Watch for changes and auto-fetch tokens

## Design System

### Typography
- Primary Font: Pretendard Variable
- Secondary Font: Montserrat

### Colors
- Primary: #000000
- Secondary: #8E8E93
- Text: #FFFFFF
- Accent: [Your accent color]

### Components

#### Cards
- Project Cards: 440/490 aspect ratio
- Interview Cards: 440/320 aspect ratio
- Community Cards: 545/800 aspect ratio

#### Navigation
- Fixed position
- Responsive design
- Interactive elements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Simon Hong - [@Simon Linkedin](https://www.linkedin.com/in/seongbong-hong-080293121/)
SungMin Hong
Project Link: [https://github.com/Cido-Graphics/cido-frontend](https://github.com/Cido-Graphics/cido-frontend)
