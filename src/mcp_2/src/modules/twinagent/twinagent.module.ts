import { Module } from '@nitrostack/core';
import { TwinAgentController } from './twinagent.controller.js';

@Module({
  name: 'twinagent',
  description: 'TwinAgent OS Enterprise Digital Twin Engine Module',
  providers: [TwinAgentController],
  exports: [TwinAgentController],
})
export class TwinAgentModule {}
