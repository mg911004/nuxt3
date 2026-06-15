const BASE_Z_INDEX = 10000;

const openCount = ref(0);
let stackOrder = 0;

export const useModalStack = () => {
  let myOrder = 0;

  const push = (): number => {
    stackOrder += 1;
    myOrder = stackOrder;
    openCount.value += 1;

    return BASE_Z_INDEX + myOrder;
  };

  const pop = () => {
    if (myOrder === 0) return;

    openCount.value = Math.max(0, openCount.value - 1);
    if (myOrder === stackOrder) {
      stackOrder = Math.max(0, stackOrder - 1);
    }
    myOrder = 0;
  };

  const isTop = () => myOrder > 0 && myOrder === stackOrder;

  return {
    push,
    pop,
    isTop,
    openCount: readonly(openCount),
  };
};
