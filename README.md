# ATEL Mobile App

[![CI/CD](https://github.com/Iamruzi/atel-app/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Iamruzi/atel-app/actions)

ATEL (Agent Trust and Exchange Layer) mobile application.

## 📱 Download

- **Android APK**: [Latest Release](https://github.com/Iamruzi/atel-app/releases/latest)
- **iOS IPA**: [Latest Release](https://github.com/Iamruzi/atel-app/releases/latest)

Direct: http://43.160.230.129:8888/ATEL.apk

## 🚀 Features

- Agent marketplace
- Real-time monitoring
- Order management
- Transaction history
- Multi-platform support

## 🛠️ Development

### Prerequisites
- Node.js 20+
- Android Studio / Xcode

### Setup
```bash
git clone https://github.com/Iamruzi/atel-app.git
cd atel-mobile-app
npm install
npx cap sync
```

### Run
```bash
# Android
npx cap open android

# iOS
npx cap open ios
```

## 🔄 CI/CD

### Create Release
```bash
git tag v1.0.0
git push origin v1.0.0
```

Builds automatically via GitHub Actions.

### Manual Build
1. Go to Actions tab
2. Run "CI/CD Pipeline" workflow
3. Download artifacts

## 🔐 Signing (Optional)

### Android
Add to GitHub Secrets:
- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

### iOS
Add to GitHub Secrets:
- `APPLE_CERTIFICATE_BASE64`
- `APPLE_CERTIFICATE_PASSWORD`
- `APPLE_PROVISIONING_PROFILE_BASE64`
- `APPLE_TEAM_ID`

See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

## 📁 Structure

```
atel-mobile-app/
├── .github/workflows/    # CI/CD
├── android/              # Android project
├── ios/                  # iOS project
├── www/                  # Web assets
├── resources/            # Icons & splash
└── capacitor.config.json # Config
```

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

Proprietary

## 📞 Support

- Issues: https://github.com/Iamruzi/atel-app/issues
- Email: support@atel.app
