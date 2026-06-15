<template>
  <div class="login-page">
    <div class="login-page__backdrop" aria-hidden="true" />

    <div class="login-page__wrap">
      <section class="login-page__card">
        <header class="login-page__head">
          <div class="login-page__logo" aria-hidden="true">
            <span class="login-page__logo-mark">DW</span>
          </div>
          <div class="login-page__brand">
            <div class="login-page__title-group">
              <h1 class="login-page__title">관리자</h1>
              <p class="login-page__subtitle">Housing Customer Service</p>
            </div>
          </div>
        </header>

        <form class="login-page__form">
          <div class="login-page__field">
            <label class="login-page__label" for="login-username">아이디</label>
            <BaseInput
              id="login-username"
              v-model="userForm.username"
              v-focus
              type="text"
              placeholder="아이디를 입력하세요"
              autocomplete="username"
            />
          </div>

          <div class="login-page__field">
            <label class="login-page__label" for="login-password">비밀번호</label>
            <BaseInput
              id="login-password"
              v-model="userForm.password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              autocomplete="current-password"
            />
          </div>

          <div class="login-page__options">
            <BaseCheckbox v-model="isRememberUsername" label="아이디 저장" />
          </div>

          <div class="login-page__actions">
            <BaseButton type="button" size="lg" block @click="handleLogin">로그인</BaseButton>
          </div>

          <div class="login-page__helper">
            <BaseButton type="button" variant="ghost" size="sm">비밀번호 초기화</BaseButton>
            <span class="login-page__helper-divider" aria-hidden="true" />
            <BaseButton type="button" variant="ghost" size="sm">담당자 문의</BaseButton>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userLoginSchema, type UserLogin } from '~/schemas/user.schema';

definePageMeta({ layout: false });

const userForm = ref<UserLogin>({
  username: '',
  password: '',
});
const isRememberUsername = ref(false);

const handleLogin = async () => {
  const result = userLoginSchema.safeParse(userForm.value);

  if (!result.success) {
    await useAlert().showWarning(result.error.issues[0].message);
    return;
  }

  try {
    const unpackedToken = await useAuthStore().login(result.data);
    if (unpackedToken) {
      useUserStore().setUserInfo(unpackedToken);
      navigateTo('/', { replace: true });
    }
  } catch (error) {
    handleError(error);
  }
};
</script>

<style scoped>
.login-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2.5rem 1.5rem;
  background: #edf1f5;
}

.login-page__backdrop {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 50% at 50% 0%, rgb(30 58 95 / 10%), transparent 70%);
  pointer-events: none;
}

.login-page__wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  max-width: 22.5rem;
}

.login-page__card {
  box-sizing: border-box;
  width: 100%;
  padding: 2.75rem 2rem 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow:
    0 0 0 1px rgb(15 23 42 / 4%),
    0 8px 24px rgb(15 23 42 / 6%);
}

.login-page__head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  text-align: center;
}

.login-page__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.875rem;
  background: var(--dw-primary);
}

.login-page__logo-mark {
  font-size: 0.9375rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #fff;
}

.login-page__brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
}

.login-page__title-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
}

.login-page__company {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--dw-text-muted);
}

.login-page__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--dw-text);
}

.login-page__subtitle {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 1.2;
  color: var(--dw-text-subtle);
}

.login-page__form {
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  width: 100%;
}

.login-page__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  min-width: 0;
}

.login-page__label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #334155;
}

.login-page__field :deep(.base-input) {
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: 100%;
  height: 2.75rem;
  padding: 0 0.875rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;
}

.login-page__options {
  width: 100%;
  min-width: 0;
}

.login-page__options :deep(.base-check__label) {
  color: #475569;
}

.login-page__actions {
  width: 100%;
  min-width: 0;
  margin-top: 0.125rem;
}

.login-page__actions :deep(.base-btn) {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 2.75rem;
  font-size: 0.9375rem;
  border-radius: 0.5rem;
}

.login-page__helper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

.login-page__helper :deep(.base-btn) {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--dw-text-muted);
}

.login-page__helper :deep(.base-btn:hover) {
  color: var(--dw-primary);
  background: transparent;
}

.login-page__helper-divider {
  width: 1px;
  height: 0.75rem;
  background: var(--dw-border-strong);
}

.login-page__foot {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  width: 100%;
  padding: 0 0.5rem;
}

.login-page__resources-title {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0 0 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #475569;
}

.login-page__resources-bullet {
  font-size: 0.4375rem;
  line-height: 1;
  color: #64748b;
}

.login-page__resources-list {
  margin: 0;
  padding: 0 0 0 0.875rem;
  list-style: none;
}

.login-page__resources-list li {
  position: relative;
  padding-left: 0.625rem;
}

.login-page__resources-list li::before {
  content: '-';
  position: absolute;
  left: 0;
  color: var(--dw-text-subtle);
}

.login-page__resources-link {
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--dw-text-subtle);
  text-decoration: none;
  transition: color 0.15s;
}

.login-page__resources-link:hover {
  color: var(--dw-primary);
  text-decoration: underline;
}

.login-page__copyright {
  margin: 0;
  padding-top: 0.875rem;
  border-top: 1px solid var(--dw-border);
  font-size: 0.6875rem;
  line-height: 1.6;
  text-align: center;
  color: var(--dw-text-subtle);
}

@media (max-width: 480px) {
  .login-page {
    padding: 1.5rem 1.25rem;
  }

  .login-page__card {
    padding: 2.25rem 1.75rem 1.75rem;
  }

  .login-page__title {
    font-size: 1.375rem;
  }
}
</style>
