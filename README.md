# 🇵🇪 Calculadora Laboral Perú

A comprehensive web application for calculating labor-related payments and benefits according to Peruvian employment law. Built with React, TypeScript, and Tailwind CSS.

![Labor Calculator Peru](https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

- **💰 Net Salary Calculator** - Calculate take-home pay after deductions (AFP/ONP, income tax)
- **🏦 CTS Calculator** - Compensation for Time of Service calculations
- **🎁 Bonus Calculator** - Calculate July (Fiestas Patrias) and December (Christmas) bonuses
- **📈 Profit Sharing Calculator** - Employee profit participation calculations
- **🏖️ Vacation Calculator** - Vacation days and payment calculations
- **🔄 Unified UX** - Enter salary once, use across all calculators
- **📱 Responsive Design** - Works seamlessly on desktop and mobile
- **🎨 Modern UI** - Clean, professional interface with smooth animations

## 🚀 Live Demo

[View Live Application](https://your-demo-url.com) *(Coming Soon)*

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify Ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/calculadora-laboral-peru.git
   cd calculadora-laboral-peru
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🧮 Calculation Details

### Net Salary (Sueldo Líquido)
- AFP deductions (varies by provider, ~10.23%)
- ONP deductions (13% for national system)
- Income tax (5th category) with progressive rates
- Based on 2024 UIT (S/ 5,150)

### CTS (Compensación por Tiempo de Servicios)
- Formula: `(Basic Salary + 1/6 Bonus) × Months Worked / 12`
- Deposited twice yearly (May & November)

### Bonuses (Gratificaciones)
- July bonus: January-June period
- December bonus: July-December period
- Proportional calculation based on months worked

### Profit Sharing (Utilidades)
- Industry-specific percentages (8% industrial, 10% mining, 5% others)
- Based on company's annual income

### Vacations (Vacaciones)
- 30 calendar days per complete year
- 2.5 days per month worked
- Proportional payment calculation

## 🤝 Contributing

We welcome contributions from developers, HR professionals, accountants, and anyone interested in improving labor calculations for Peruvian workers!

### Ways to Contribute

#### 🐛 Bug Reports & Feature Requests
- Found a calculation error? [Open an issue](https://github.com/yourusername/calculadora-laboral-peru/issues)
- Have ideas for new features? We'd love to hear them!

#### 💻 Code Contributions
- Fix bugs or implement new features
- Improve UI/UX design
- Add tests and documentation
- Optimize performance

#### 📚 Documentation & Legal
- Update calculation formulas based on new regulations
- Improve documentation and help text
- Translate content (currently Spanish/English)
- Verify legal compliance with current Peruvian labor law

#### 🎨 Design & UX
- Improve visual design
- Enhance mobile experience
- Create better data visualizations
- Accessibility improvements

### Development Guidelines

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow existing code style
   - Add comments for complex calculations
   - Test your changes thoroughly
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Keep components modular and reusable
- Add JSDoc comments for calculation functions

## 📊 Project Structure

```
src/
├── components/           # React components
│   ├── SueldoLiquido.tsx    # Net salary calculator
│   ├── CTSCalculator.tsx    # CTS calculator
│   ├── GratificacionCalculator.tsx  # Bonus calculator
│   ├── UtilidadesCalculator.tsx     # Profit sharing
│   └── VacacionesCalculator.tsx     # Vacation calculator
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📈 Roadmap

### Short Term
- [ ] Add unit tests for all calculations
- [ ] Implement data export (PDF/Excel)
- [ ] Add calculation history
- [ ] Dark mode support

### Medium Term
- [ ] Multi-language support (English, Quechua)
- [ ] Advanced tax scenarios
- [ ] Comparison tools
- [ ] Mobile app (React Native)

### Long Term
- [ ] Integration with payroll systems
- [ ] Real-time tax rate updates
- [ ] Advanced reporting features
- [ ] API for third-party integrations

## ⚖️ Legal Disclaimer

This tool provides **reference calculations** based on Peruvian labor law. Results should be verified with qualified professionals for specific cases. The calculations are based on:

- Decreto Supremo N° 001-97-TR (TUO de la Ley de Productividad y Competitividad Laboral)
- Current UIT values and tax brackets
- Standard industry practices

**Always consult with labor law specialists for official calculations.**

## 📄 License

This project will be released under an open source license (to be determined). We're considering:

- MIT License (maximum freedom)
- Apache 2.0 (patent protection)
- GPL v3 (copyleft)

Community input on license choice is welcome!

## 🙏 Acknowledgments

- Built with ❤️ for Peruvian workers
- Inspired by the need for accessible labor calculation tools
- Thanks to all contributors and the open source community

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/calculadora-laboral-peru/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/calculadora-laboral-peru/discussions)
- **Email**: your-email@example.com

---

**Made with 🇵🇪 for Peru's workforce**

*Help us make labor calculations accessible to everyone!*