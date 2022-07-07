import { NextPage } from 'next';
import { memo } from 'react';

export type NextProps<P = {}> = NextPage<P & { className?: string }>;
export const typedMemo: <T>(c: T) => T = memo;
export type ResponseData = { message: string };
