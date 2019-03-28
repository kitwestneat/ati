(echo "<?php "; i=0; for x in $(grep -o '"wordpress/[^"]*\.js"' build/index.html | sed -e 's/wordpress//'); do echo "wp_enqueue_script('fp$i', $x);"; ((i++)); done) > build/index.php
