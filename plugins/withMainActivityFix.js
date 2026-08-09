const { withMainActivity, withMainApplication } = require('@expo/config-plugins');

const onCreatePatch = `  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }

  override fun getMainComponentName()`;

const crashHandlerSnippet = `    try {
      val prevCrashHandler = Thread.getDefaultUncaughtExceptionHandler()
      Thread.setDefaultUncaughtExceptionHandler { thread, throwable ->
        try {
          java.io.File(filesDir, "sn_crash.txt")
            .writeText(android.util.Log.getStackTraceString(throwable))
        } catch (_: Exception) {
        }
        if (prevCrashHandler != null) {
          prevCrashHandler.uncaughtException(thread, throwable)
        } else {
          android.os.Process.killProcess(android.os.Process.myPid())
        }
      }
    } catch (_: Exception) {
    }`;

module.exports = function withCrashDiagnostics(config) {
  config = withMainActivity(config, (config) => {
    let source = config.modResults.contents;

    if (!source.includes('import android.os.Bundle')) {
      source = source.replace(
        /import android\.os\.Build/,
        'import android.os.Bundle\nimport android.os.Build'
      );
    }

    if (!source.includes('override fun onCreate')) {
      source = source.replace('override fun getMainComponentName()', onCreatePatch);
    }

    config.modResults.contents = source;
    return config;
  });

  config = withMainApplication(config, (config) => {
    let source = config.modResults.contents;

    if (!source.includes('Thread.setDefaultUncaughtExceptionHandler')) {
      source = source.replace(
        /override fun onCreate\(\) \{\n(\s*)super\.onCreate\(\)/,
        (match, indent) => `override fun onCreate() {\n${indent}super.onCreate()\n${crashHandlerSnippet}`
      );
    }

    config.modResults.contents = source;
    return config;
  });

  return config;
};
