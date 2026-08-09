const { withMainActivity } = require('@expo/config-plugins');

const onCreatePatch = `  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }

  override fun getMainComponentName()`;

module.exports = function withMainActivityFix(config) {
  return withMainActivity(config, (config) => {
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
};
