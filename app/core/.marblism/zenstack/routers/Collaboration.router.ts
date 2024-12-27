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

        createMany: procedure.input($Schema.CollaborationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).collaboration.createMany(input as any))),

        create: procedure.input($Schema.CollaborationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).collaboration.create(input as any))),

        deleteMany: procedure.input($Schema.CollaborationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).collaboration.deleteMany(input as any))),

        delete: procedure.input($Schema.CollaborationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).collaboration.delete(input as any))),

        findFirst: procedure.input($Schema.CollaborationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).collaboration.findFirst(input as any))),

        findMany: procedure.input($Schema.CollaborationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).collaboration.findMany(input as any))),

        findUnique: procedure.input($Schema.CollaborationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).collaboration.findUnique(input as any))),

        updateMany: procedure.input($Schema.CollaborationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).collaboration.updateMany(input as any))),

        update: procedure.input($Schema.CollaborationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).collaboration.update(input as any))),

        count: procedure.input($Schema.CollaborationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).collaboration.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CollaborationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CollaborationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CollaborationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CollaborationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CollaborationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CollaborationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CollaborationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CollaborationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CollaborationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CollaborationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CollaborationGetPayload<T>, Context>) => Promise<Prisma.CollaborationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CollaborationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CollaborationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CollaborationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CollaborationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CollaborationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CollaborationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CollaborationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CollaborationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CollaborationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CollaborationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CollaborationGetPayload<T>, Context>) => Promise<Prisma.CollaborationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CollaborationFindFirstArgs, TData = Prisma.CollaborationGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.CollaborationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CollaborationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CollaborationFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CollaborationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CollaborationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CollaborationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CollaborationFindManyArgs, TData = Array<Prisma.CollaborationGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CollaborationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CollaborationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CollaborationFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CollaborationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CollaborationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CollaborationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CollaborationFindUniqueArgs, TData = Prisma.CollaborationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CollaborationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CollaborationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CollaborationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CollaborationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CollaborationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CollaborationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CollaborationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CollaborationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CollaborationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CollaborationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CollaborationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CollaborationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CollaborationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CollaborationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CollaborationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CollaborationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CollaborationGetPayload<T>, Context>) => Promise<Prisma.CollaborationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.CollaborationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CollaborationCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.CollaborationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.CollaborationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.CollaborationCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.CollaborationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.CollaborationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CollaborationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
