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

        createMany: procedure.input($Schema.JobMatchInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobMatch.createMany(input as any))),

        create: procedure.input($Schema.JobMatchInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobMatch.create(input as any))),

        deleteMany: procedure.input($Schema.JobMatchInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobMatch.deleteMany(input as any))),

        delete: procedure.input($Schema.JobMatchInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobMatch.delete(input as any))),

        findFirst: procedure.input($Schema.JobMatchInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).jobMatch.findFirst(input as any))),

        findMany: procedure.input($Schema.JobMatchInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).jobMatch.findMany(input as any))),

        findUnique: procedure.input($Schema.JobMatchInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).jobMatch.findUnique(input as any))),

        updateMany: procedure.input($Schema.JobMatchInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobMatch.updateMany(input as any))),

        update: procedure.input($Schema.JobMatchInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobMatch.update(input as any))),

        count: procedure.input($Schema.JobMatchInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).jobMatch.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.JobMatchCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobMatchCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobMatchCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobMatchCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.JobMatchCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobMatchCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobMatchGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobMatchGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobMatchCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobMatchCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobMatchGetPayload<T>, Context>) => Promise<Prisma.JobMatchGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.JobMatchDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobMatchDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobMatchDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobMatchDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.JobMatchDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobMatchDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobMatchGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobMatchGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobMatchDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobMatchDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobMatchGetPayload<T>, Context>) => Promise<Prisma.JobMatchGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.JobMatchFindFirstArgs, TData = Prisma.JobMatchGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.JobMatchFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JobMatchGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobMatchFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.JobMatchFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JobMatchGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JobMatchGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.JobMatchFindManyArgs, TData = Array<Prisma.JobMatchGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.JobMatchFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.JobMatchGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobMatchFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.JobMatchFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.JobMatchGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.JobMatchGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.JobMatchFindUniqueArgs, TData = Prisma.JobMatchGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.JobMatchFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JobMatchGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobMatchFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.JobMatchFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JobMatchGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JobMatchGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.JobMatchUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobMatchUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobMatchUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobMatchUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.JobMatchUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobMatchUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobMatchGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobMatchGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobMatchUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobMatchUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobMatchGetPayload<T>, Context>) => Promise<Prisma.JobMatchGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.JobMatchCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.JobMatchCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.JobMatchCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.JobMatchCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.JobMatchCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.JobMatchCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.JobMatchCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.JobMatchCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
