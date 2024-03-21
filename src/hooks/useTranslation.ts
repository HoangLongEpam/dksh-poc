import { useCallback } from "react";
import { Locale, LocalizedString } from "@commercetools/platform-sdk";
import { DEFAULT_LOCALE } from "@/constants/Locale";

export type TFunction = (value: LocalizedString | undefined, locale?: Locale) => string;
interface ReturnedValues {
  t: TFunction;
}

export const useTranslation = (): ReturnedValues => {
  const translate = useCallback<TFunction>(
    (value: LocalizedString | undefined, locale: Locale = DEFAULT_LOCALE) => {
      if (!value) return "";

      return value?.[locale ?? DEFAULT_LOCALE];
    },
    []
  );

  return { t: translate };
};
