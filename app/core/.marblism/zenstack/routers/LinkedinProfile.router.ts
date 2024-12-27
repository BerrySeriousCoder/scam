/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.LinkedinProfileInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).linkedinProfile.createMany(input as any))),

        create: procedure.input($Schema.LinkedinProfileInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).linkedinProfile.create(input as any))),

        deleteMany: procedure.input($Schema.LinkedinProfileInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).linkedinProfile.deleteMany(input as any))),

        delete: procedure.input($Schema.LinkedinProfileInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).linkedinProfile.delete(input as any))),

        findFirst: procedure.input($Schema.LinkedinProfileInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).linkedinProfile.findFirst(input as any))),

        findMany: procedure.input($Schema.LinkedinProfileInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).linkedinProfile.findMany(input as any))),

        findUnique: procedure.input($Schema.LinkedinProfileInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).linkedinProfile.findUnique(input as any))),

        updateMany: procedure.input($Schema.LinkedinProfileInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).linkedinProfile.updateMany(input as any))),

        update: procedure.input($Schema.LinkedinProfileInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).linkedinProfile.update(input as any))),

        count: procedure.input($Schema.LinkedinProfileInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).linkedinProfile.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.LinkedinProfileCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LinkedinProfileCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LinkedinProfileCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LinkedinProfileCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.LinkedinProfileCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LinkedinProfileCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LinkedinProfileGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LinkedinProfileGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LinkedinProfileCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LinkedinProfileCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LinkedinProfileGetPayload<T>, Context>) => Promise<Prisma.LinkedinProfileGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.LinkedinProfileDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LinkedinProfileDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LinkedinProfileDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LinkedinProfileDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.LinkedinProfileDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LinkedinProfileDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LinkedinProfileGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LinkedinProfileGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LinkedinProfileDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LinkedinProfileDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LinkedinProfileGetPayload<T>, Context>) => Promise<Prisma.LinkedinProfileGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.LinkedinProfileFindFirstArgs, TData = Prisma.LinkedinProfileGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.LinkedinProfileFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.LinkedinProfileGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LinkedinProfileFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.LinkedinProfileFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.LinkedinProfileGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.LinkedinProfileGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.LinkedinProfileFindManyArgs, TData = Array<Prisma.LinkedinProfileGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.LinkedinProfileFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.LinkedinProfileGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LinkedinProfileFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.LinkedinProfileFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.LinkedinProfileGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.LinkedinProfileGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.LinkedinProfileFindUniqueArgs, TData = Prisma.LinkedinProfileGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.LinkedinProfileFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.LinkedinProfileGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LinkedinProfileFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.LinkedinProfileFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.LinkedinProfileGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.LinkedinProfileGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.LinkedinProfileUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LinkedinProfileUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LinkedinProfileUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LinkedinProfileUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.LinkedinProfileUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LinkedinProfileUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LinkedinProfileGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LinkedinProfileGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LinkedinProfileUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LinkedinProfileUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LinkedinProfileGetPayload<T>, Context>) => Promise<Prisma.LinkedinProfileGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.LinkedinProfileCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.LinkedinProfileCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.LinkedinProfileCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.LinkedinProfileCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.LinkedinProfileCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.LinkedinProfileCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.LinkedinProfileCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.LinkedinProfileCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
