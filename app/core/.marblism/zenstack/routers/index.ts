/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createUserRouter from "./User.router";
import createDocumentRouter from "./Document.router";
import createTemplateRouter from "./Template.router";
import createJobMatchRouter from "./JobMatch.router";
import createLinkedinProfileRouter from "./LinkedinProfile.router";
import createCollaborationRouter from "./Collaboration.router";
import createCareerPathRouter from "./CareerPath.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as DocumentClientType } from "./Document.router";
import { ClientType as TemplateClientType } from "./Template.router";
import { ClientType as JobMatchClientType } from "./JobMatch.router";
import { ClientType as LinkedinProfileClientType } from "./LinkedinProfile.router";
import { ClientType as CollaborationClientType } from "./Collaboration.router";
import { ClientType as CareerPathClientType } from "./CareerPath.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        document: createDocumentRouter(router, procedure),
        template: createTemplateRouter(router, procedure),
        jobMatch: createJobMatchRouter(router, procedure),
        linkedinProfile: createLinkedinProfileRouter(router, procedure),
        collaboration: createCollaborationRouter(router, procedure),
        careerPath: createCareerPathRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    document: DocumentClientType<AppRouter>;
    template: TemplateClientType<AppRouter>;
    jobMatch: JobMatchClientType<AppRouter>;
    linkedinProfile: LinkedinProfileClientType<AppRouter>;
    collaboration: CollaborationClientType<AppRouter>;
    careerPath: CareerPathClientType<AppRouter>;
}
