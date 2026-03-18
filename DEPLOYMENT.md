# Deployment Guide

## 🚀 Quick Deploy

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Iamruzi/atel-app.git
git branch -M main
git push -u origin main
```

### 2. Create Release
```bash
git tag v1.0.0
git push origin v1.0.0
```

This triggers automatic build and release.

## 🔐 Signing Setup

### Android Keystore

Generate:
```bash
keytool -genkey -v -keystore release.keystore -alias atel -keyalg RSA -keysize 2048 -validity 10000
base64 release.keystore > keystore.txt
```

Add to GitHub Secrets:
- `ANDROID_KEYSTORE_BASE64`: Content of keystore.txt
- `ANDROID_KEYSTORE_PASSWORD`: Your password
- `ANDROID_KEY_ALIAS`: atel
- `ANDROID_KEY_PASSWORD`: Your password

### iOS Certificate

Export from Keychain:
1. Export certificate as .p12
2. Encode: `base64 -i cert.p12 > cert.txt`
3. Encode profile: `base64 -i profile.mobileprovision > profile.txt`

Add to GitHub Secrets:
- `APPLE_CERTIFICATE_BASE64`: Content of cert.txt
- `APPLE_CERTIFICATE_PASSWORD`: Certificate password
- `APPLE_PROVISIONING_PROFILE_BASE64`: Content of profile.txt
- `APPLE_TEAM_ID`: Your Team ID

## 📦 Build Outputs

- Android Debug: `ATEL-v1.0.0-debug.apk`
- Android Release: `ATEL-v1.0.0-release.apk`
- iOS Simulator: `ATEL-v1.0.0-simulator.zip`
- iOS Device: `ATEL-v1.0.0-release.ipa` (if signed)

## 🔄 Version Management

Versions auto-generated from:
- Git tags: `v1.2.3` → `1.2.3`
- Run number: `1.0.{run_number}`

Manual: Update `version.json`

## 📱 Distribution

### Android
- Google Play Store
- Direct APK download
- Firebase App Distribution

### iOS
- App Store
- TestFlight
- Ad-Hoc distribution

## 🐛 Troubleshooting

### Build Fails
- Check workflow logs in Actions
- Verify secrets are correct
- Ensure dependencies are up to date

### Signing Issues
- Verify certificate validity
- Check Team ID matches
- Ensure provisioning profile is correct

## 📞 Support

For issues: https://github.com/Iamruzi/atel-app/issues
