<?php
    function encrypt($message)
	{
	    // Store the cipher method
        $ciphering = "AES-128-CTR";
        $iv_length = openssl_cipher_iv_length($ciphering);
        $options = 0;
        $encryption_iv = '1234567891011121';
        $encryption_key = "FinalAssignment2022";

        $encrypted = openssl_encrypt($message, $ciphering, $encryption_key, $options, $encryption_iv);

		return $encrypted;
	}

	function decrypt($encrypted)
    {
        // Store the cipher method
        $ciphering = "AES-128-CTR";
        $iv_length = openssl_cipher_iv_length($ciphering);
        $options = 0;
        $decryption_iv = '1234567891011121';
        $decryption_key = "FinalAssignment2022";

        $message = openssl_decrypt ($encrypted, $ciphering, $decryption_key, $options, $decryption_iv);

        return $message;
    }
?>