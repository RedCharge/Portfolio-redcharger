<?php
$number = 50; // fixed number for now (keeps it simple)
$message = "";

if (isset($_POST['guess'])) {
    $guess = $_POST['guess'];

    if ($guess > $number) {
        $message = "Too high!";
    } elseif ($guess < $number) {
        $message = "Too low!";
    } else {
        $message = "Correct!";
    }
}
?>

<form method="post">
    Enter number (1-100):
    <input type="number" name="guess">
    <button type="submit">Check</button>
</form>

<p><?php echo $message; ?></p>