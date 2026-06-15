declare module '#app' {
  interface NuxtApp {
    $swal: {
      fire: (options: unknown) => Promise<{ isConfirmed: boolean }>;
    };
  }
}

export {};
