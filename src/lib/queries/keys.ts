export const worriesKeys = {
  all: ['worries'] as const,
  worries: (idx: string, tag: string) =>
    [...worriesKeys.all, { idx }, { tag }] as const,
  // worry: (idx: string, tags: string, filters: string) =>
  //   [...worriesKeys.worries(idx, tags), { filters }] as const,
  details: () => [...worriesKeys.all, 'detail'] as const,
  worry: (idx: string, tag: string, worryId: string, chatId: string) =>
    [
      ...worriesKeys.all,
      worriesKeys.worries(idx, tag),
      { worryId },
      { chatId },
    ] as const,
};
