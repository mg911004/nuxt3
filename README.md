# Nuxt 3 개발 환경 구성

## 버전 정보

```text
Nuxt Version : 3.21.5
Node.js Version : 20.20.2
pnpm Version : 10.33.0
```

---

# 1. nvm 설치

## Windows

- nvm-windows 설치
- https://github.com/coreybutler/nvm-windows/releases
- `nvm-setup.exe` 다운로드 후 설치

---

## macOS / Linux

- nvm 설치
- https://github.com/nvm-sh/nvm

설치 명령어:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

---

# 2. Node.js 설치

```bash
nvm install 20.20.2
```

---

# 3. Node.js 버전 적용

```bash
nvm use 20.20.2
```

---

# 4. Node.js 버전 확인

```bash
node -v
```

---

# 5. Corepack 활성화 및 pnpm 설정

## Corepack 활성화

```bash
corepack enable
```

---

## pnpm 10.33.0 활성화

```bash
corepack prepare pnpm@10.33.0 --activate
```

---

## pnpm 버전 확인

```bash
pnpm -v
```

---

# 6. 프로젝트 실행

## 의존성 설치

```bash
pnpm install
```

---

## 개발 서버 실행

```bash
pnpm dev
```

---

# 추가 권장 사항

프로젝트의 `package.json` 내 `packageManager` 설정을 통해 pnpm 버전을 관리한다.

```json
"packageManager": "pnpm@10.33.0"
```

---

# 참고 사항

- Node.js 버전 변경 후에는 Corepack 및 pnpm 재설정을 권장한다.
- 프로젝트 실행 전 Node.js 및 pnpm 버전을 확인한다.
