import type { Argument } from "classnames";

import classNames from "classnames";
import { twMerge } from "tailwind-merge";

/**
 * Combine the functionality of classnames & tailwind-merge 
 * to manage overridable utility classes.
 */
export const mergeClasses = (...args: Argument[]): string => twMerge(classNames(...args));

