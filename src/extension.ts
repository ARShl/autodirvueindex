// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

import { commands, window } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // 创建component或page页面
  const createCRP: any = commands.registerCommand(
    'autodirvueindex.cvcop',
    async (fileUri) => {
      if (!fileUri) {
        return;
      }

      const createDir = path.resolve(fileUri.fsPath);
      if (!createDir) {
        return;
      }
      const cRPName: any = await window.showInputBox({
        placeHolder: '页面名称'
      });

      const namespace = cRPName[0].toUpperCase() + cRPName?.substring(1);
      const d = path.join(createDir, cRPName);
      const f = path.join(d, 'index.vue');
      if (fs.existsSync(f)) {
        window.showErrorMessage('文件已存在！');
        return;
      }
      const s = path.join(d, 'index.stylus');
      if (fs.existsSync(s)) {
        window.showErrorMessage('stylus文件已存在!');
        return;
      }

      fs.mkdirSync(d);
      fs.writeFileSync(
        f,
        `
<template>
  <div>
    
  </div>
</template>

<script>
export default {
  name: 'Newnew',
  components: {

  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
@import './index.stylus'
</style>
			`
      );

      fs.writeFileSync(s, `// use stylus css standard`);
    }
  );

  context.subscriptions.push(createCRP);
}

// this method is called when your extension is deactivated
export function deactivate() {}
