export const worriesKeys = {
  all: ['worries'] as const,
  worries: (idx: string, eachTagId: string, tagId: string | number[]) =>
    [...worriesKeys.all, idx, eachTagId, tagId] as const,
  // worry: (idx: string, tags: string, filters: string) =>
  //   [...worriesKeys.worries(idx, tags), { filters }] as const,
  details: (worryId: string) =>
    [...worriesKeys.all, 'detail', worryId] as const,
  worry: (
    idx: string,
    eachTagId: string,
    tagId: string | number[],
    worryId: string,
    chatId: string,
  ) =>
    [
      ...worriesKeys.all,
      worriesKeys.worries(idx, eachTagId, tagId),
      { worryId },
      { chatId },
    ] as const,
};
