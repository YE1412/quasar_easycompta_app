package org.capacitor.quasar.easycompta;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.plugin.http.Http;

public class MainActivity extends BridgeActivity {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// Initializes the Bridge
		this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {
			{
			  // Additional plugins you've installed go here
			  // Ex: add(TotallyAwesomePlugin.class);
			  add(Http.class);
			}
		});
	}
}
