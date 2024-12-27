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

        createMany: procedure.input($Schema.CareerPathInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).careerPath.createMany(input as any))),

        create: procedure.input($Schema.CareerPathInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).careerPath.create(input as any))),

        deleteMany: procedure.input($Schema.CareerPathInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).careerPath.deleteMany(input as any))),

        delete: procedure.input($Schema.CareerPathInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).careerPath.delete(input as any))),

        findFirst: procedure.input($Schema.CareerPathInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).careerPath.findFirst(input as any))),

        findMany: procedure.input($Schema.CareerPathInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).careerPath.findMany(input as any))),

        findUnique: procedure.input($Schema.CareerPathInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).careerPath.findUnique(input as any))),

        updateMany: procedure.input($Schema.CareerPathInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).careerPath.updateMany(input as any))),

        update: procedure.input($Schema.CareerPathInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).careerPath.update(input as any))),

        count: procedure.input($Schema.CareerPathInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).careerPath.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CareerPathCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CareerPathCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CareerPathCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CareerPathCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CareerPathCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CareerPathCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CareerPathGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CareerPathGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CareerPathCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CareerPathCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CareerPathGetPayload<T>, Context>) => Promise<Prisma.CareerPathGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CareerPathDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CareerPathDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CareerPathDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CareerPathDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CareerPathDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CareerPathDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CareerPathGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CareerPathGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CareerPathDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CareerPathDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CareerPathGetPayload<T>, Context>) => Promise<Prisma.CareerPathGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CareerPathFindFirstArgs, TData = Prisma.CareerPathGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.CareerPathFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CareerPathGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CareerPathFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CareerPathFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CareerPathGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CareerPathGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CareerPathFindManyArgs, TData = Array<Prisma.CareerPathGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CareerPathFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CareerPathGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CareerPathFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CareerPathFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CareerPathGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CareerPathGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CareerPathFindUniqueArgs, TData = Prisma.CareerPathGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CareerPathFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CareerPathGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CareerPathFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CareerPathFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CareerPathGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CareerPathGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CareerPathUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CareerPathUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CareerPathUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CareerPathUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CareerPathUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CareerPathUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CareerPathGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CareerPathGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CareerPathUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CareerPathUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CareerPathGetPayload<T>, Context>) => Promise<Prisma.CareerPathGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.CareerPathCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CareerPathCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.CareerPathCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.CareerPathCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.CareerPathCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.CareerPathCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.CareerPathCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CareerPathCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
