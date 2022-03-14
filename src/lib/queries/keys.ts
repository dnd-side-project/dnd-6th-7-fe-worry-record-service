export const worriesKeys = {
  all: ['worries'] as const,
  worries: (idx: string, tagId: string | number[]) =>
    [...worriesKeys.all, idx, tagId] as const,
  // worry: (idx: string, tags: string, filters: string) =>
  //   [...worriesKeys.worries(idx, tags), { filters }] as const,
  details: (worryId: string) =>
    [...worriesKeys.all, 'detail', worryId] as const,
  worry: (
    idx: string,
    tagId: string | number[],
    worryId: string,
    chatId: string,
  ) =>
    [
      ...worriesKeys.all,
      worriesKeys.worries(idx, tagId),
      { worryId },
      { chatId },
    ] as const,
};
