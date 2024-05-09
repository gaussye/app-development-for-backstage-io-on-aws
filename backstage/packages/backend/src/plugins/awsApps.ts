//awsApps.ts

import {createRouter} from '@aws/plugin-aws-apps-backend-for-backstage'
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import {DefaultIdentityClient } from '@backstage/plugin-auth-node';

export default async function createPlugin({
  logger,
  discovery,
  config,
  permissions,
}: PluginEnvironment): Promise<Router> {
  return await createRouter({
    logger: logger,
    // userIdentity: identity,
    userIdentity: DefaultIdentityClient.create({
      discovery,
      issuer: await discovery.getExternalBaseUrl('auth'),
    }),
    config,
    permissions,
  });
}