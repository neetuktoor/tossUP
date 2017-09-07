<!-- NavBar will appear on every page -->
	<!-- Need to make this mobile friendly -->
	  <nav>
	    <div class="nav-wrapper">
	    <a data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
	      <a href="index.html">toss</a> <strong style="font-size: 40px; color: red">UP</strong>
	      <ul class="right hide-on-med-and-down">
	        <li><a href="#"><i class="material-icons" style="color:white">add_box</i></a></li>
	       	<li><a href="#"><i class="material-icons" style="color:white">notifications_active</i></a></li>
	        <li><a href="#"><i class="material-icons" style="color:white">person_outline</i></a></li>
	      </ul>
	      <ul class="side-nav" id="mobile-demo">
			<div class ="titleBox">
				<span class="title1">toss</span>
				<span class="title2">UP</span>
				<p class="subtitle">Make your own luck.</p>
			</div>
	      	<li><a href="#"><i class="material-icons" style="color: red">home</i></a></li>
			<li><a href="#"><i class="material-icons" style="color: gray">add_box</i>Create Bet</a></li>
	       	<li><a href="#"><i class="material-icons" style="color: gray">notifications_active</i>Notifications</a></li>
	        <li><a href="#"><i class="material-icons" style="color: gray">person_outline</i>Profile</a></li>
      	</ul>
	    </div>
	  </nav>
	
	
    <script type="text/javascript">
    	$( document ).ready(function(){
    		$(".button-collapse").sideNav();
    	});
    </script>